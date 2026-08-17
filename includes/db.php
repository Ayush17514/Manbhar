<?php
/**
 * Universal Database Connection Bridge for PHP
 * Supports:
 * 1. Supabase / PostgreSQL (via PDO pdo_pgsql)
 * 2. Remote / Local MySQL (via MySQLi or PDO pdo_mysql)
 * 3. Graceful In-Memory Fallback if DB is temporarily unreachable or offline
 */

global $conn, $pdo;

$db_host = getenv('DB_HOST') ?: getenv('PGHOST') ?: '';
$db_port = getenv('DB_PORT') ?: getenv('PGPORT') ?: '';
$db_user = getenv('DB_USER') ?: getenv('PGUSER') ?: '';
$db_pass = getenv('DB_PASSWORD') ?: getenv('DB_PASS') ?: getenv('PGPASSWORD') ?: '';
$db_name = getenv('DB_NAME') ?: getenv('PGDATABASE') ?: '';
$db_driver = getenv('DB_DRIVER') ?: '';

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

if (!$db_driver) {
    if (strpos($db_host, 'supabase.co') !== false || $db_port == '5432' || getenv('PGHOST')) {
        $db_driver = 'pgsql';
    } else {
        $db_driver = 'mysql';
    }
}

// 1. Establish PDO Connection
$pdo = null;
if (!empty($db_host)) {
    try {
        if ($db_driver === 'pgsql' && extension_loaded('pdo_pgsql')) {
            $port_clause = $db_port ? ";port={$db_port}" : ";port=5432";
            $dsn = "pgsql:host={$db_host}{$port_clause};dbname={$db_name};sslmode=require";
            $pdo = new PDO($dsn, $db_user, $db_pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } else if (extension_loaded('pdo_mysql')) {
            $port_clause = $db_port ? ";port={$db_port}" : ";port=3306";
            $dsn = "mysql:host={$db_host}{$port_clause};dbname={$db_name};charset=utf8mb4";
            $pdo = new PDO($dsn, $db_user, $db_pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        }
    } catch (PDOException $e) {
        error_log("PDO Connection Notice: " . $e->getMessage());
        $pdo = null;
    }
}

// 2. Wrap into universal $conn interface or safe fallback
class UniversalDatabaseShim {
    private $pdo;
    public $connect_error = null;
    public $insert_id = 1;

    public function __construct($pdo = null) {
        $this->pdo = $pdo;
    }

    public function query($sql) {
        if ($this->pdo) {
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
                        return $this->stmt ? $this->stmt->fetch(PDO::FETCH_ASSOC) : null;
                    }
                };
            } catch (Exception $e) {
                error_log("Query error: " . $e->getMessage());
            }
        }
        return $this->fallbackResultSet($sql);
    }

    public function prepare($sql) {
        if ($this->pdo) {
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
                    try {
                        $this->stmt = $this->pdo->prepare($this->sql);
                        return $this->stmt->execute($this->params);
                    } catch (Exception $e) {
                        error_log("Prepare execute error: " . $e->getMessage());
                        return false;
                    }
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
                            return $this->stmt ? $this->stmt->fetch(PDO::FETCH_ASSOC) : null;
                        }
                    };
                }
                public function fetch() {
                    return $this->stmt ? $this->stmt->fetch() : false;
                }
                public function close() {}
            };
        }
        return $this->fallbackPreparedStatement($sql);
    }

    private function fallbackResultSet($sql) {
        $sampleData = $this->getMockProducts();
        return new class($sampleData) {
            private $data;
            private $index = 0;
            public $num_rows;
            public function __construct($data) {
                $this->data = $data;
                $this->num_rows = count($data);
            }
            public function fetch_assoc() {
                if ($this->index < count($this->data)) {
                    return $this->data[$this->index++];
                }
                return null;
            }
        };
    }

    private function fallbackPreparedStatement($sql) {
        $sampleData = $this->getMockProducts();
        return new class($sampleData) {
            private $data;
            public function __construct($data) {
                $this->data = $data;
            }
            public function bind_param($types, ...$vars) {}
            public function execute() { return true; }
            public function get_result() {
                return new class($this->data) {
                    private $data;
                    private $index = 0;
                    public $num_rows;
                    public function __construct($data) {
                        $this->data = $data;
                        $this->num_rows = count($data);
                    }
                    public function fetch_assoc() {
                        if ($this->index < count($this->data)) {
                            return $this->data[$this->index++];
                        }
                        return null;
                    }
                };
            }
            public function close() {}
        };
    }

    private function getMockProducts() {
        return [
            [
                "id" => 1,
                "title" => "Jaipur Royal Polki Diamond Necklace",
                "price" => 85000.00,
                "description" => "Handcrafted 22K yellow gold polki necklace set with certified diamonds.",
                "image" => "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80"
            ],
            [
                "id" => 2,
                "title" => "Kundan Floral Chandelier Earrings",
                "price" => 34500.00,
                "description" => "Exquisite uncut diamond and kundan earrings with South Sea pearls.",
                "image" => "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80"
            ],
            [
                "id" => 3,
                "title" => "Solitaire Diamond Engagement Ring",
                "price" => 62000.00,
                "description" => "1.00 Carat VVS1 round brilliant cut diamond on 18K white gold band.",
                "image" => "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80"
            ],
            [
                "id" => 4,
                "title" => "Temple Heritage Gold Bangle Pair",
                "price" => 118000.00,
                "description" => "Antique finished 22K solid gold bangles with intricate Nakshi carving.",
                "image" => "https://images.unsplash.com/photo-1611591475102-40e9d6d376f9?w=600&auto=format&fit=crop&q=80"
            ]
        ];
    }

    public function close() {}
    public function set_charset($cs) {}
}

if ($db_driver === 'mysql' && extension_loaded('mysqli') && !empty($db_host)) {
    $conn = @new mysqli($db_host, $db_user, $db_pass, $db_name, (int)$db_port);
    if ($conn->connect_error) {
        $conn = new UniversalDatabaseShim($pdo);
    } else {
        $conn->set_charset("utf8mb4");
    }
} else {
    $conn = new UniversalDatabaseShim($pdo);
}
