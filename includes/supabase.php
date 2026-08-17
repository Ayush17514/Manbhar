<?php
/**
 * Supabase REST & Auth Client Helper
 * Use this helper anywhere in PHP to interact with Supabase REST API and Storage directly
 */

class SupabaseClient {
    private $url;
    private $key;

    public function __construct() {
        $this->url = rtrim(getenv('SUPABASE_URL') ?: '', '/');
        $this->key = getenv('SUPABASE_ANON_KEY') ?: getenv('SUPABASE_SERVICE_ROLE_KEY') ?: '';
    }

    public function from($table) {
        return new SupabaseQueryBuilder($this->url, $this->key, $table);
    }
}

class SupabaseQueryBuilder {
    private $url;
    private $key;
    private $table;
    private $params = [];

    public function __construct($url, $key, $table) {
        $this->url = $url;
        $this->key = $key;
        $this->table = $table;
    }

    public function select($columns = '*') {
        $this->params['select'] = $columns;
        return $this;
    }

    public function eq($column, $value) {
        $this->params[$column] = 'eq.' . urlencode($value);
        return $this;
    }

    public function get() {
        $queryString = http_build_query($this->params);
        $endpoint = "{$this->url}/rest/v1/{$this->table}?{$queryString}";

        $ch = curl_init($endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                "apikey: {$this->key}",
                "Authorization: Bearer {$this->key}",
                "Content-Type: application/json"
            ]
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true) ?: [];
    }

    public function insert($data) {
        $endpoint = "{$this->url}/rest/v1/{$this->table}";

        $ch = curl_init($endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                "apikey: {$this->key}",
                "Authorization: Bearer {$this->key}",
                "Content-Type: application/json",
                "Prefer: return=representation"
            ]
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true) ?: [];
    }
}
