<?php
require_once __DIR__ . '/../config.php';

switch (method()) {

    // ----------------------------------------------------------------
    //  POST → connexion
    //  body : { "login": "...", "password": "..." }
    // ----------------------------------------------------------------
    case 'POST':
        $b        = body();
        $login    = clean($b['login']    ?? '');
        $password = $b['password'] ?? '';

        if (!$login || !$password) err('Login et mot de passe requis');

        $stmt = db()->prepare('SELECT * FROM utilisateurs WHERE login = ? LIMIT 1');
        $stmt->execute([$login]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['mot_de_passe'])) {
            // Pause anti-brute-force
            usleep(300_000); // 0.3 s
            err('Identifiants incorrects', 401);
        }

        $_SESSION['admin_id']    = $user['id'];
        $_SESSION['admin_login'] = $user['login'];

        ok(['login' => $user['login'], 'message' => 'Connexion réussie']);
        break;

    // ----------------------------------------------------------------
    //  DELETE → déconnexion
    // ----------------------------------------------------------------
    case 'DELETE':
        session_destroy();
        ok(['message' => 'Déconnexion réussie']);
        break;

    // ----------------------------------------------------------------
    //  GET → vérifier la session courante
    // ----------------------------------------------------------------
    case 'GET':
        if (!empty($_SESSION['admin_id'])) {
            ok(['authenticated' => true, 'login' => $_SESSION['admin_login']]);
        }
        err('Non authentifié', 401);
        break;

    default:
        err('Méthode non autorisée', 405);
}
