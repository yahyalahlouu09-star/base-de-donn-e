<?php
require_once __DIR__ . '/../config.php';
authRequired();

$db = db();

ok([
    'articles_total'       => (int)$db->query('SELECT COUNT(*) FROM articles')->fetchColumn(),
    'articles_publies'     => (int)$db->query("SELECT COUNT(*) FROM articles WHERE statut='publie'")->fetchColumn(),
    'articles_brouillon'   => (int)$db->query("SELECT COUNT(*) FROM articles WHERE statut='brouillon'")->fetchColumn(),
    'commentaires_total'   => (int)$db->query('SELECT COUNT(*) FROM commentaires')->fetchColumn(),
    'commentaires_pending' => (int)$db->query('SELECT COUNT(*) FROM commentaires WHERE approuve=0')->fetchColumn(),
    'categories_total'     => (int)$db->query('SELECT COUNT(*) FROM categories')->fetchColumn(),
]);
