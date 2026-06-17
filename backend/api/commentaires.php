<?php
require_once __DIR__ . '/../config.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch (method()) {

    // ----------------------------------------------------------------
    //  GET  → liste des commentaires
    //  ?article_id=X  : filtre par article
    //  ?admin=1       : tous (approuvés + en attente), auth requise
    // ----------------------------------------------------------------
    case 'GET':
        $articleId = isset($_GET['article_id']) ? (int)$_GET['article_id'] : null;
        $adminMode = !empty($_GET['admin']) && !empty($_SESSION['admin_id']);

        $where  = [];
        $params = [];

        if ($articleId) {
            $where[]  = 'c.article_id = ?';
            $params[] = $articleId;
        }
        if (!$adminMode) {
            $where[] = 'c.approuve = 1';
        }

        $whereSQL = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $stmt = db()->prepare("
            SELECT c.*, a.titre AS article_titre
            FROM commentaires c
            LEFT JOIN articles a ON a.id = c.article_id
            $whereSQL
            ORDER BY c.date_commentaire DESC
        ");
        $stmt->execute($params);
        ok($stmt->fetchAll());
        break;

    // ----------------------------------------------------------------
    //  POST → soumettre un commentaire (public)
    // ----------------------------------------------------------------
    case 'POST':
        $b = body();

        // Validation
        if (empty($b['article_id'])) err('article_id requis');
        if (empty($b['pseudo']))     err('Pseudo requis');
        if (empty($b['contenu']))    err('Contenu requis');

        $pseudo  = clean($b['pseudo']);
        $contenu = clean($b['contenu']);
        $email   = clean($b['email'] ?? '');

        if (strlen($pseudo)  > 80)  err('Pseudo trop long (max 80 car.)');
        if (strlen($contenu) < 5)   err('Commentaire trop court (min 5 car.)');
        if (strlen($contenu) > 2000) err('Commentaire trop long (max 2000 car.)');
        if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) err('Email invalide');

        // Vérifier que l'article est publié
        $chk = db()->prepare('SELECT id FROM articles WHERE id = ? AND statut = "publie"');
        $chk->execute([(int)$b['article_id']]);
        if (!$chk->fetch()) err('Article introuvable', 404);

        $stmt = db()->prepare('
            INSERT INTO commentaires (article_id, pseudo, email, contenu)
            VALUES (?, ?, ?, ?)
        ');
        $stmt->execute([(int)$b['article_id'], $pseudo, $email ?: null, $contenu]);

        ok([
            'id'      => (int)db()->lastInsertId(),
            'message' => 'Commentaire soumis, en attente de modération.',
        ], 201);
        break;

    // ----------------------------------------------------------------
    //  PUT ?id=X → approuver / rejeter (admin)
    //  body : { "approuve": true|false }
    // ----------------------------------------------------------------
    case 'PUT':
        authRequired();
        if (!$id) err('Paramètre id requis');
        $b = body();

        if (!array_key_exists('approuve', $b)) err('Champ « approuve » requis');

        $stmt = db()->prepare('UPDATE commentaires SET approuve = ? WHERE id = ?');
        $stmt->execute([(int)(bool)$b['approuve'], $id]);
        ok(['updated' => $stmt->rowCount()]);
        break;

    // ----------------------------------------------------------------
    //  DELETE ?id=X → supprimer (admin)
    // ----------------------------------------------------------------
    case 'DELETE':
        authRequired();
        if (!$id) err('Paramètre id requis');
        $stmt = db()->prepare('DELETE FROM commentaires WHERE id = ?');
        $stmt->execute([$id]);
        ok(['deleted' => $stmt->rowCount()]);
        break;

    default:
        err('Méthode non autorisée', 405);
}
