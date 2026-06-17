<?php
// ============================================================
//  MinimalBlog — Script d'initialisation
//  Accès : http://localhost/.../backend/setup.php
//  ⚠ SUPPRIMER ce fichier après exécution !
// ============================================================

// Adaptez ces valeurs à votre environnement
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'minimalblog');

header('Content-Type: text/html; charset=UTF-8');

$style = '
<style>
  body { font-family: monospace; background:#0b0b15; color:#eeeeff; padding:2rem; line-height:1.7; }
  h1   { font-size:1.5rem; margin-bottom:1rem; }
  .ok  { color:#34d399; } .err { color:#f87171; } .info { color:#a78bfa; }
  pre  { background:#1a1a2e; padding:1rem; border-radius:8px; overflow:auto; color:#fbbf24; }
  a    { color:#67e8f9; }
</style>';

echo $style;

try {
    // 1. Connexion sans base (pour créer la DB si besoin)
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // 2. Créer la base
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "`
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "<p class='ok'>✅ Base de données <strong>" . DB_NAME . "</strong> créée (ou déjà existante).</p>";

    // 3. Sélectionner la base
    $pdo->exec("USE `" . DB_NAME . "`");

    // 4. Lire et exécuter le fichier SQL
    $sqlFile = __DIR__ . '/../database/minimalblog.sql';
    if (!file_exists($sqlFile)) {
        throw new RuntimeException("Fichier SQL introuvable : $sqlFile");
    }

    $sql = file_get_contents($sqlFile);

    // Supprimer commentaires et diviser par ";"
    // On retire les lignes de commentaires -- mais on garde les données
    $statements = array_filter(
        array_map('trim', explode(";\n", $sql)),
        fn($s) => strlen($s) > 5
    );

    $executed = 0;
    foreach ($statements as $stmt) {
        if (trim($stmt)) {
            $pdo->exec($stmt);
            $executed++;
        }
    }
    echo "<p class='ok'>✅ $executed instructions SQL exécutées.</p>";

    // 5. (Re)créer l'admin avec un vrai hash bcrypt
    $hash = password_hash('admin123', PASSWORD_BCRYPT, ['cost' => 10]);
    $pdo->prepare("
        INSERT INTO `utilisateurs` (`login`, `mot_de_passe`)
        VALUES ('admin', ?)
        ON DUPLICATE KEY UPDATE `mot_de_passe` = VALUES(`mot_de_passe`)
    ")->execute([$hash]);

    echo "<p class='ok'>✅ Compte admin mis à jour avec hash bcrypt.</p>";
    echo "<hr style='border-color:#1a1a2e;margin:1.5rem 0'>";
    echo "<h1 class='ok'>🎉 Installation terminée !</h1>";
    echo "<p><strong>Accès admin :</strong> login = <code>admin</code> / mot de passe = <code>admin123</code></p>";
    echo "<p class='info'>Lancez le frontend : <a href='../frontend/index.html'>../frontend/index.html</a></p>";
    echo "<p class='err'>⚠ Supprimez ce fichier immédiatement pour des raisons de sécurité !</p>";
    echo "<pre>rm " . __FILE__ . "</pre>";

} catch (Throwable $e) {
    echo "<h1 class='err'>❌ Erreur lors de l'installation</h1>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "\n\n" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
    echo "<p class='info'>Vérifiez DB_HOST / DB_USER / DB_PASS en haut de ce fichier.</p>";
}
