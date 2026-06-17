<?php
require_once __DIR__ . '/../config.php';

// Identifiant extrait du query-string (?id=X)
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch (method()) {

    // ----------------------------------------------------------------
    //  GET  /api/articles.php          → liste paginée avec filtres
    //  GET  /api/articles.php?id=X     → article unique
    // ----------------------------------------------------------------
    case 'GET':
        if ($id) {
            $stmt = db()->prepare('
                SELECT a.*, c.nom AS categorie_nom,
                  (SELECT COUNT(*) FROM commentaires WHERE article_id = a.id AND approuve = 1) AS nb_commentaires
                FROM articles a
                LEFT JOIN categories c ON c.id = a.categorie_id
                WHERE a.id = ?
            ');
            $stmt->execute([$id]);
            $article = $stmt->fetch();
            if (!$article) err('Article introuvable', 404);
            ok($article);
        }

        // Filtres optionnels
        $statut   = clean($_GET['statut']       ?? '');
        $catId    = isset($_GET['categorie_id']) ? (int)$_GET['categorie_id'] : null;
        $search   = clean($_GET['search']        ?? '');
        $page     = max(1, (int)($_GET['page']    ?? 1));
        $perPage  = max(1, min(50, (int)($_GET['per_page'] ?? 6)));

        $where  = [];
        $params = [];

        if ($statut) {
            $where[]  = 'a.statut = ?';
            $params[] = $statut;
        }
        if ($catId) {
            $where[]  = 'a.categorie_id = ?';
            $params[] = $catId;
        }
        if ($search) {
            $where[]  = '(a.titre LIKE ? OR a.contenu LIKE ?)';
            $params[] = "%$search%";
            $params[] = "%$search%";
        }

        $whereSQL = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        // Nombre total
        $cnt = db()->prepare("SELECT COUNT(*) FROM articles a $whereSQL");
        $cnt->execute($params);
        $total = (int)$cnt->fetchColumn();

        // Données
        $offset = ($page - 1) * $perPage;
        $stmt = db()->prepare("
            SELECT a.*, c.nom AS categorie_nom,
              (SELECT COUNT(*) FROM commentaires WHERE article_id = a.id AND approuve = 1) AS nb_commentaires
            FROM articles a
            LEFT JOIN categories c ON c.id = a.categorie_id
            $whereSQL
            ORDER BY a.date_publication DESC, a.created_at DESC
            LIMIT ? OFFSET ?
        ");
        $stmt->execute([...$params, $perPage, $offset]);

        ok([
            'articles'    => $stmt->fetchAll(),
            'total'       => $total,
            'page'        => $page,
            'per_page'    => $perPage,
            'total_pages' => (int)ceil($total / $perPage),
        ]);
        break;

    // ----------------------------------------------------------------
    //  POST /api/articles.php  → créer un article (admin)
    // ----------------------------------------------------------------
    case 'POST':
        authRequired();
        $b = body();

        foreach (['titre', 'contenu', 'categorie_id', 'auteur'] as $field) {
            if (empty($b[$field])) err("Champ « $field » requis");
        }

        $statut = in_array($b['statut'] ?? '', ['publie', 'brouillon']) ? $b['statut'] : 'brouillon';
        $datePub = $statut === 'publie' ? date('Y-m-d H:i:s') : null;

        $stmt = db()->prepare('
            INSERT INTO articles
              (categorie_id, titre, contenu, auteur, image_principale, emoji, statut, date_publication)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            (int)$b['categorie_id'],
            clean($b['titre']),
            trim($b['contenu']),
            clean($b['auteur']),
            clean($b['image_principale'] ?? ''),
            clean($b['emoji'] ?? '📝'),
            $statut,
            $datePub,
        ]);

        ok(['id' => (int)db()->lastInsertId()], 201);
        break;

    // ----------------------------------------------------------------
    //  PUT /api/articles.php?id=X  → modifier un article (admin)
    // ----------------------------------------------------------------
    case 'PUT':
        authRequired();
        if (!$id) err('Paramètre id requis');
        $b = body();

        foreach (['titre', 'contenu', 'categorie_id', 'auteur'] as $field) {
            if (empty($b[$field])) err("Champ « $field » requis");
        }

        $statut = in_array($b['statut'] ?? '', ['publie', 'brouillon']) ? $b['statut'] : 'brouillon';

        $stmt = db()->prepare('
            UPDATE articles SET
                categorie_id     = ?,
                titre            = ?,
                contenu          = ?,
                auteur           = ?,
                image_principale = ?,
                emoji            = ?,
                statut           = ?,
                date_publication = CASE
                    WHEN ? = "publie" AND date_publication IS NULL THEN NOW()
                    ELSE date_publication
                END
            WHERE id = ?
        ');
        $stmt->execute([
            (int)$b['categorie_id'],
            clean($b['titre']),
            trim($b['contenu']),
            clean($b['auteur']),
            clean($b['image_principale'] ?? ''),
            clean($b['emoji'] ?? '📝'),
            $statut,
            $statut,   // pour le CASE
            $id,
        ]);

        ok(['updated' => $stmt->rowCount()]);
        break;

    // ----------------------------------------------------------------
    //  DELETE /api/articles.php?id=X  → supprimer (admin)
    // ----------------------------------------------------------------
    case 'DELETE':
        authRequired();
        if (!$id) err('Paramètre id requis');
        $stmt = db()->prepare('DELETE FROM articles WHERE id = ?');
        $stmt->execute([$id]);
        ok(['deleted' => $stmt->rowCount()]);
        break;

    default:
        err('Méthode non autorisée', 405);
}
