<?php
require_once __DIR__ . '/../config.php';

match(method()) {
    'GET' => ok(
        db()->query('SELECT * FROM categories ORDER BY nom')->fetchAll()
    ),
    default => err('Méthode non autorisée', 405)
};
