<?php
/**
 * Universal Database Connection Bridge for PHP
 * Supports:
 * 1. Supabase / PostgreSQL (via PDO or PgSQL)
 * 2. Remote / Local MySQL (via MySQLi or PDO)
 * 3. Environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DATABASE_URL)
 */

// Global database connection instances
global $conn, $pdo;

$db_host = getenv('DB_HOST') ?: getenv('PGHOST') ?: '127.0.0.1';
$db_port = getenv('DB_PORT') ?: getenv('PGPORT') ?: '3306';
$db_user = getenv('DB_USER') ?: getenv('PGUSER') ?: 'root';
$db_pass = getenv('DB_PASSWORD') ?: getenv('DB_PASS') ?: getenv('PGPASSWORD') ?: '';
$db_name = getenv('DB_NAME') ?: getenv('PGDATABASE') ?: 'klmvjenl_jaincabs';
$db_driver = getenv('DB_DRIVER') ?: (strpos($db_host, 'supabase.co') !== false || $db_port == '5432' || getenv('PGHOST') ? 'pgsql' : 'mysql');

// Support DATABASE_URL / connection strings (common on Supabase, Render, Railway, Heroku)
$database_url = getenv('DATABASE_URL') ?: getenv('SUPABASE_DB_URL');
if ($database_url) {
    $dbparts = parse_url($database_url);
    if ($dbparts && isset($dbparts['host'])) {
        $db_host = $dbparts['host'];
        $db_port = $dbparts['port'] ?? ($dbparts['scheme'] === 'postgres' || $dbparts['scheme'] === 'postgresql' ? 5432 : 3306);
        $db_user = $dbparts['user'] ?? $db_user;
        $db_pass = $dbparts['pass'] ?? $db_pass;
        $db_name = isset($dbparts['path']) ? ltrim($dbparts['path'], '/') : $db_name;
        if (isset($dbparts['scheme']) && in_array($dbparts['scheme'], ['postgres', 'postgresql', 'pgsql'])) {
            $db_driver = 'pgsql';
        }
    }
}

// 1. Establish PDO Connection
try {
    if ($db_driver === 'pgsql') {
        $dsn = "pgsql:host={$db_host};port={$db_port};dbname={$db_name};sslmode=require";
        $pdo = new PDO($dsn, $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } else {
        $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
        $pdo = new PDO($dsn, $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
} catch (PDOException $e) {
    error_log("PDO Connection Error: " . $e->getMessage());
}

// 2. Establish MySQLi connection (for backwards-compatibility with legacy $conn->query() / $conn->prepare())
if ($db_driver === 'mysql' && extension_loaded('mysqli')) {
    $conn = @new mysqli($db_host, $db_user, $db_pass, $db_name, (int)$db_port);
    if ($conn->connect_error) {
        error_log("MySQLi connection failed: " . $conn->connect_error);
    } else {
        $conn->set_charset("utf8mb4");
    }
} else if ($pdo) {
    // If connected to Supabase/PostgreSQL, wrap PDO so basic $conn calls continue to work seamlessly
    class DatabaseShim {
        private $pdo;
        public $connect_error = null;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function query($sql) {
            try {
                $stmt = $this->pdo->query($sql);
                return new class($stmt) {
                    private $stmt;
                    public $num_rows;
                    public function __construct($stmt) {
                        $this->stmt = $stmt;
                        $this->num_rows = $stmt ? $stmt->rowCount() : 0;
                    }
                    public function fetch_assoc() {
                        return $this->stmt->fetch(PDO::FETCH_ASSOC);
                    }
                };
            } catch (Exception $e) {
                return false;
            }
        }

        public function prepare($sql) {
            // Translate ? placeholders to $1, $2 or PDO standard
            return new class($this->pdo, $sql) {
                private $pdo;
                private $sql;
                private $params = [];
                private $stmt;
                public function __construct($pdo, $sql) {
                    $this->pdo = $pdo;
                    $this->sql = $sql;
                }
                public function bind_param($types, ...$vars) {
                    $this->params = $vars;
                }
                public function execute() {
                    $this->stmt = $this->pdo->prepare($this->sql);
                    return $this->stmt->execute($this->params);
                }
                public function get_result() {
                    return new class($this->stmt) {
                        private $stmt;
                        public $num_rows;
                        public function __construct($stmt) {
                            $this->stmt = $stmt;
                            $this->num_rows = $stmt ? $stmt->rowCount() : 0;
                        }
                        public function fetch_assoc() {
                            return $this->stmt->fetch(PDO::FETCH_ASSOC);
                        }
                    };
                }
                public function bind_result(&...$vars) {
                    // Shim for legacy bind_result
                }
                public function fetch() {
                    return $this->stmt ? $this->stmt->fetch() : false;
                }
                public function close() {}
            };
        }

        public function close() {}
        public function set_charset($cs) {}
    }

    $conn = new DatabaseShim($pdo);
}
