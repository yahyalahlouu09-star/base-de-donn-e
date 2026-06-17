-- ============================================================
--  MinimalBlog — Schéma MySQL/MariaDB
--  Compatible : MySQL 5.7+ / MariaDB 10.3+
--  Encodage   : utf8mb4 (emoji + caractères spéciaux)
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- ============================================================
--  BASE DE DONNÉES
-- ============================================================
CREATE DATABASE IF NOT EXISTS `minimalblog`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `minimalblog`;

-- ============================================================
--  TABLE : categories
-- ============================================================
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id`  INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(80)      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_nom` (`nom`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : utilisateurs
-- ============================================================
DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE `utilisateurs` (
  `id`           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `login`        VARCHAR(50)   NOT NULL,
  `mot_de_passe` VARCHAR(255)  NOT NULL COMMENT 'hash bcrypt (cost 10)',
  `created_at`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_login` (`login`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : articles
-- ============================================================
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id`               INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `categorie_id`     INT UNSIGNED  NOT NULL,
  `titre`            VARCHAR(255)  NOT NULL,
  `contenu`          LONGTEXT      NOT NULL,
  `auteur`           VARCHAR(100)  NOT NULL DEFAULT 'Admin',
  `image_principale` VARCHAR(500)  NULL     DEFAULT NULL,
  `emoji`            VARCHAR(10)   NULL     DEFAULT '📝',
  `statut`           ENUM('brouillon','publie') NOT NULL DEFAULT 'brouillon',
  `date_publication` DATETIME      NULL     DEFAULT NULL,
  `created_at`       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_statut`   (`statut`),
  KEY `idx_cat`      (`categorie_id`),
  KEY `idx_date`     (`date_publication`),
  CONSTRAINT `fk_article_categorie`
    FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : commentaires
-- ============================================================
DROP TABLE IF EXISTS `commentaires`;
CREATE TABLE `commentaires` (
  `id`               INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `article_id`       INT UNSIGNED  NOT NULL,
  `pseudo`           VARCHAR(80)   NOT NULL,
  `email`            VARCHAR(150)  NULL     DEFAULT NULL,
  `contenu`          TEXT          NOT NULL,
  `approuve`         TINYINT(1)    NOT NULL DEFAULT 0,
  `date_commentaire` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_article`  (`article_id`),
  KEY `idx_approuve` (`approuve`),
  CONSTRAINT `fk_commentaire_article`
    FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

SET foreign_key_checks = 1;

-- ============================================================
--  DONNÉES DE TEST — Catégories
-- ============================================================
INSERT INTO `categories` (`nom`) VALUES
  ('Technologie'),
  ('Voyage'),
  ('Culture'),
  ('Science'),
  ('Lifestyle');

-- ============================================================
--  DONNÉES DE TEST — Admin
--  Login : admin / Mot de passe : admin123
--  Hash bcrypt généré par setup.php (voir backend/setup.php)
--  Pour régénérer : php -r "echo password_hash('admin123', PASSWORD_BCRYPT);"
-- ============================================================
INSERT INTO `utilisateurs` (`login`, `mot_de_passe`) VALUES
  ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
-- NOTE : ce hash générique sera remplacé par setup.php avec un vrai hash bcrypt

-- ============================================================
--  DONNÉES DE TEST — Articles
-- ============================================================
INSERT INTO `articles`
  (`categorie_id`,`titre`,`contenu`,`auteur`,`emoji`,`statut`,`date_publication`)
VALUES
(1,
 "L'Intelligence Artificielle en 2025 : État des lieux",
 "L'intelligence artificielle a connu une évolution spectaculaire ces dernières années. Des modèles de langage aux systèmes de vision par ordinateur, les avancées sont impressionnantes.\n\nLes grands modèles de langage (LLM) sont désormais capables de raisonnement complexe, de génération de code et même de résolution de problèmes mathématiques avancés. Cette révolution technologique impacte tous les secteurs : médecine, éducation, industrie.\n\nCependant, des questions éthiques importantes se posent : biais algorithmiques, impact sur l'emploi, vie privée. La régulation de l'IA devient un enjeu majeur pour les gouvernements du monde entier.\n\nLes chercheurs travaillent activement sur des systèmes plus transparents et alignés avec les valeurs humaines. L'avenir dépendra autant de nos choix politiques que de nos capacités techniques.",
 'Marie Laurent','🤖','publie','2025-01-15 10:00:00'),

(2,
 'Voyage au Maroc : De Casablanca à Marrakech',
 "Le Maroc est une destination qui ne cesse de me fasciner. À chaque visite, je découvre de nouveaux visages de ce pays aux mille couleurs.\n\nNotre voyage a commencé à Casablanca, avec la majestueuse mosquée Hassan II qui se dresse face à l'Atlantique. L'architecture est époustouflante : les artisans ont mis des années à créer ces mosaïques et sculptures en bois de cèdre.\n\nDe là, nous avons suivi la route côtière vers El Jadida, une ville portugaise fortifiée inscrite au patrimoine de l'UNESCO. Les remparts blancs offrent une vue panoramique sur l'océan.\n\nLa dernière étape, Marrakech, est un choc sensoriel. La place Jemaa el-Fna s'anime dès la tombée de la nuit : conteurs, musiciens gnaouas, dresseurs de singes... La médina labyrinthique cache des riads magnifiques.",
 'Marie Laurent','🌍','publie','2025-01-20 14:30:00'),

(3,
 'Le Néoclassicisme au Cinéma Contemporain',
 "Ces dernières années, on observe un retour remarquable aux codes esthétiques du classicisme dans le cinéma mondial. Des réalisateurs comme Wes Anderson avec ses symétries obsessionnelles, ou Paul Thomas Anderson avec ses longs plans-séquences, réinventent des traditions visuelles vieilles de plusieurs décennies.\n\nCe mouvement néoclassique ne se limite pas à l'esthétique. Sur le plan narratif, on retrouve des structures aristotéliciennes claires : exposition, nœud, dénouement. Les personnages ont à nouveau des arcs de transformation nets.\n\nLe public semble répondre positivement à cette clarté narrative, lassé peut-être de l'expérimentation formelle excessive des années 2000-2010. La nostalgie joue aussi un rôle : ces films évoquent un âge d'or imaginaire du cinéma.",
 'Marie Laurent','🎬','publie','2025-02-01 09:00:00'),

(4,
 'Les Trous Noirs : Nouvelles Découvertes',
 "L'astronomie vit une révolution silencieuse. Grâce au télescope Event Horizon et aux nouvelles générations d'observatoires gravitationnels, nous commençons à percer les secrets des trous noirs.\n\nLa première image directe d'un trou noir, obtenue en 2019 pour M87*, a confirmé les prédictions d'Einstein avec une précision remarquable. En 2022, c'est notre propre galaxie qui a livré son secret : Sagittarius A*, le trou noir supermassif au centre de la Voie Lactée.\n\nPlusieurs découvertes récentes bousculent nos modèles théoriques. Des trous noirs intermédiaires ont été détectés pour la première fois, comblant le fossé entre les trous noirs stellaires et les mastodontes galactiques.\n\nLes ondes gravitationnelles ouvrent une toute nouvelle fenêtre sur l'univers.",
 'Marie Laurent','🔭','publie','2025-02-10 16:00:00'),

(5,
 'Minimalisme : Vivre avec Moins pour Vivre Mieux',
 "Le mouvement minimaliste gagne du terrain, en réaction à une société de consommation qui pousse à l'accumulation. L'idée centrale est simple : se débarrasser du superflu pour se concentrer sur l'essentiel.\n\nJe pratique le minimalisme depuis trois ans maintenant. La première étape a été difficile : trier ses affaires, donner, recycler. Mais le résultat est libérateur. Un appartement épuré, où chaque objet a sa place et son utilité, procure une sérénité difficile à expliquer mais facile à ressentir.\n\nLe minimalisme va au-delà des objets. Il s'applique aussi au temps : dire non aux réunions inutiles, aux obligations sociales vides de sens. Récupérer son temps, c'est récupérer sa vie.\n\nBien sûr, le minimalisme est un privilège. Mais ses principes d'intentionnalité et de gratitude restent universels.",
 'Marie Laurent','🧘','publie','2025-02-15 11:00:00'),

(1,
 'WebAssembly : La Révolution du Web',
 "WebAssembly (Wasm) est en train de redéfinir les limites de ce qu'on peut faire dans un navigateur. Cette technologie permet d'exécuter du code compilé (C++, Rust, Go...) directement dans le navigateur, avec des performances proches du natif.\n\nLes applications sont multiples : jeux vidéo haute performance, outils de montage vidéo, moteurs physiques, et même des systèmes d'exploitation complets. Figma utilise WebAssembly pour son moteur de rendu.\n\nAvec l'arrivée de WASI (WebAssembly System Interface), Wasm sort du navigateur pour s'installer sur les serveurs. Docker et ses créateurs voient en WASI un successeur potentiel aux conteneurs.\n\nLa courbe d'adoption est encore jeune, mais les fondations sont solides.",
 'Marie Laurent','⚡','brouillon', NULL);

-- ============================================================
--  DONNÉES DE TEST — Commentaires
-- ============================================================
INSERT INTO `commentaires`
  (`article_id`,`pseudo`,`email`,`contenu`,`approuve`,`date_commentaire`)
VALUES
(1,'TechEnthusiast42','tech@example.com',
 'Article très intéressant ! La partie sur les biais algorithmiques mériterait d\'être approfondie.',
 1,'2025-01-16 08:30:00'),
(1,'Sophia_Dev','sophia@dev.com',
 'Je travaille dans l\'IA et je confirme tout ce qui est dit. L\'alignement des valeurs est LE défi de notre époque.',
 1,'2025-01-17 14:20:00'),
(1,'CuriousReader', NULL,
 'Est-ce que vous pensez que l\'IA va vraiment remplacer les développeurs ?',
 1,'2025-01-18 10:00:00'),
(2,'VoyageurDuMonde','voyageur@example.com',
 'J\'ai fait ce même trajet l\'année dernière. Vous devriez aussi aller à Essaouira, c\'est magnifique !',
 1,'2025-01-21 09:15:00'),
(2,'MarrakechLover', NULL,
 'La médina de Marrakech est effectivement un labyrinthe incroyable. Avez-vous visité les jardins Majorelle ?',
 1,'2025-01-22 16:45:00'),
(3,'CinéphilePassionné','cinephile@example.com',
 'Wes Anderson est un génie ! Asteroid City est une merveille visuelle.',
 1,'2025-02-02 11:30:00'),
(4,'AstroNerd99', NULL,
 'Les ondes gravitationnelles sont fascinantes. LIGO a vraiment ouvert une nouvelle ère.',
 1,'2025-02-11 20:00:00'),
(5,'Minimaliste_Life','minimal@example.com',
 'Je pratique le minimalisme depuis 5 ans et je confirme que c\'est transformateur. Merci !',
 1,'2025-02-16 07:45:00'),
-- Commentaires en attente de modération
(1,'SpamTest','spam@spam.com',
 'Ceci est un commentaire de test en attente de modération.',
 0,'2025-01-19 03:00:00'),
(2,'EnAttente','pending@example.com',
 'Super article, j\'adore le Maroc !',
 0,'2025-01-23 12:00:00');
