<?php
// ============================================================
//  POST /api/soumettre.php — Soumission publique d'article
//  Aucune authentification requise.
//  Statut inséré : 'soumis' (en attente de validation admin)
// ============================================================
require_once __DIR__ . '/../config.php';

if (method() !== 'POST') err('Méthode non autorisée', 405);

$b = body();

// ---- Validation ----
$titre   = clean($b['titre']   ?? '');
$auteur  = clean($b['auteur']  ?? '');
$email   = clean($b['email']   ?? '');
$contenu = trim($b['contenu']  ?? '');
$catId   = isset($b['categorie_id']) ? (int)$b['categorie_id'] : 0;
$image   = clean($b['image_principale'] ?? '');

if (!$titre)   err('Le titre est requis');
if (!$auteur)  err('Le nom de l\'auteur est requis');
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) err('Email invalide');
if (!$contenu) err('Le contenu est requis');
if (mb_strlen($contenu, 'UTF-8') < 100) err('Le contenu est trop court (minimum 100 caractères)');
if (!$catId)   err('La catégorie est requise');

// Vérifier que la catégorie existe
$chk = db()->prepare('SELECT id FROM categories WHERE id = ?');
$chk->execute([$catId]);
if (!$chk->fetch()) err('Catégorie introuvable');

// ---- Insertion ----
$stmt = db()->prepare('
    INSERT INTO articles
      (categorie_id, titre, contenu, auteur, email_auteur, image_principale, emoji, statut, date_publication)
    VALUES (?, ?, ?, ?, ?, ?, ?, \'soumis\', NULL)
');
$stmt->execute([
    $catId,
    $titre,
    $contenu,
    $auteur,
    $email,
    $image ?: null,
    '📝',
]);

ok(['id' => (int)db()->lastInsertId()], 201);
