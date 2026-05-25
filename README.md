# 🗞️ MinimalBlog — Plateforme de Publication

**Projet BD ESISA — Pr. FENNANE SALMA**

## 📁 Structure du projet

```
minimalblog/
│
├── index.html              → Accueil public (liste articles paginée)
├── article.html            → Détail article + commentaires
│
├── css/
│   └── style.css           → Styles communs
│
├── js/
│   └── db.js               → Base de données (localStorage) + utilitaires
│
└── admin/
    ├── login.html          → Connexion administrateur
    ├── dashboard.html      → Tableau de bord (statistiques)
    ├── articles.html       → CRUD articles
    └── commentaires.html   → Modération commentaires
```

## 🚀 Comment utiliser

1. **Ouvrir** `index.html` dans un navigateur (double-clic)
2. **Accès admin** : cliquer "Admin" → login: `admin` / mdp: `admin123`

> ⚠️ Utilise **localStorage** pour la persistance (données simulées en JS).
> En production réelle, il faudrait un serveur + MySQL + PHP/Node.js.

## 🗄️ Base de données simulée

| Table | Colonnes |
|-------|---------|
| categories | id, nom |
| articles | id, categorie_id, titre, contenu, date_publication, auteur, image_principale, statut, emoji |
| commentaires | id, article_id, pseudo, email, contenu, date_commentaire, approuve |
| utilisateurs | login, mot_de_passe |

## ✅ Fonctionnalités implémentées

### Partie publique
- [x] Liste des articles paginés (6 par page)
- [x] Filtre par catégorie
- [x] Recherche par mot-clé
- [x] Page détail article
- [x] Formulaire d'ajout de commentaire
- [x] Affichage des commentaires approuvés

### Partie admin
- [x] Connexion sécurisée par session
- [x] Tableau de bord avec statistiques
- [x] CRUD articles (créer, lire, modifier, supprimer)
- [x] Filtre articles par statut/catégorie/recherche
- [x] Modération commentaires (approuver/supprimer)
- [x] Déconnexion

## 📌 Technologies utilisées
- **HTML5** — Structure sémantique
- **CSS3** — Variables CSS, Grid, Flexbox, animations
- **JavaScript Vanilla** — DOM, localStorage, sessionStorage
- **Google Fonts** — Playfair Display + Source Sans 3
