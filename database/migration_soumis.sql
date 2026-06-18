-- ============================================================
--  Migration : ajout du statut 'soumis' et email_auteur
--  À exécuter UNE SEULE FOIS sur une base existante
--  Compatible MySQL 5.7+ / MariaDB 10.3+
-- ============================================================

USE `minimalblog`;

-- 1. Ajouter la colonne email_auteur (si elle n'existe pas)
ALTER TABLE `articles`
  ADD COLUMN IF NOT EXISTS `email_auteur` VARCHAR(150) NULL DEFAULT NULL
  AFTER `auteur`;

-- 2. Étendre l'ENUM pour inclure 'soumis'
ALTER TABLE `articles`
  MODIFY COLUMN `statut`
    ENUM('brouillon','publie','soumis') NOT NULL DEFAULT 'brouillon';

-- Vérification
SELECT COLUMN_NAME, COLUMN_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'minimalblog'
  AND TABLE_NAME   = 'articles'
  AND COLUMN_NAME  IN ('statut','email_auteur');
