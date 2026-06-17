<?php
// ============================================================
//  MinimalBlog — Configuration & helpers partagés
//  Inclure en premier dans chaque endpoint API
// ============================================================

// ---- Connexion base de données ----
define('DB_HOST',    'localhost');
define('DB_NAME',    'minimalblog');
define('DB_USER',    'root');
define('DB_PASS',    '');          // adapter selon votre environnement
define('DB_CHARSET', 'utf8mb4');

// ---- CORS ----
// Autorise le frontend servi depuis le même hôte ou localhost
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['http://localhost', 'http://127.0.0.1', 'http://localhost:8080'];

if (in_array($origin, $allowed) || str_starts_with($origin, 'http://localhost')) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

// Répondre immédiatement aux pré-vols OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ---- Session ----
session_name('mb_session');
session_start();

// ---- Singleton PDO ----
function db(): PDO {
    static $pdo;
    if (!$pdo) {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}

// ---- Réponses JSON ----
function ok(mixed $data = null, int $code = 200): never {
    http_response_code($code);
    echo json_encode(['success' => true, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

function err(string $msg, int $code = 400): never {
    http_response_code($code);
    echo json_encode(['success' => false, 'error' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---- Lecture du corps JSON ----
function body(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

// ---- Méthode HTTP courante ----
function method(): string {
    return $_SERVER['REQUEST_METHOD'];
}

// ---- Protection admin ----
function authRequired(): void {
    if (empty($_SESSION['admin_id'])) err('Non autorisé', 401);
}

// ---- Nettoyage léger d'une chaîne ----
function clean(mixed $v): string {
    return trim((string)($v ?? ''));
}
