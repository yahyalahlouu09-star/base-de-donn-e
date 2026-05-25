// ============================================
//  MinimalBlog — Base de données (localStorage)
// ============================================

const DB = {

  // ---- Initialisation des données de démo ----
  init() {
    if (!localStorage.getItem('mb_initialized')) {
      this.seedCategories();
      this.seedArticles();
      this.seedCommentaires();
      this.seedAdmin();
      localStorage.setItem('mb_initialized', 'true');
    }
  },

  reset() {
    localStorage.removeItem('mb_initialized');
    localStorage.removeItem('mb_categories');
    localStorage.removeItem('mb_articles');
    localStorage.removeItem('mb_commentaires');
    localStorage.removeItem('mb_admin');
    this.init();
  },

  // ---- CATEGORIES ----
  seedCategories() {
    const cats = [
      { id: 1, nom: 'Technologie' },
      { id: 2, nom: 'Voyage' },
      { id: 3, nom: 'Cuisine' },
      { id: 4, nom: 'Science' },
      { id: 5, nom: 'Culture' }
    ];
    localStorage.setItem('mb_categories', JSON.stringify(cats));
  },

  getCategories() {
    return JSON.parse(localStorage.getItem('mb_categories')) || [];
  },

  addCategorie(nom) {
    const cats = this.getCategories();
    const id = cats.length ? Math.max(...cats.map(c => c.id)) + 1 : 1;
    cats.push({ id, nom });
    localStorage.setItem('mb_categories', JSON.stringify(cats));
    return id;
  },

  getCategorieById(id) {
    return this.getCategories().find(c => c.id == id);
  },

  // ---- ARTICLES ----
  seedArticles() {
    const articles = [
      {
        id: 1, categorie_id: 1,
        titre: "L'Intelligence Artificielle en 2025 : État des lieux",
        contenu: `L'intelligence artificielle a connu une évolution spectaculaire ces dernières années. Des modèles de langage aux systèmes de vision par ordinateur, les avancées sont impressionnantes.\n\nLes grands modèles de langage (LLM) sont désormais capables de raisonnement complexe, de génération de code et même de résolution de problèmes mathématiques avancés. Cette révolution technologique impacte tous les secteurs : médecine, éducation, industrie...\n\nCependant, des questions éthiques importantes se posent : biais algorithmiques, impact sur l'emploi, vie privée. La régulation de l'IA devient un enjeu majeur pour les gouvernements du monde entier.`,
        date_publication: '2025-03-15T10:00:00',
        auteur: 'Marie Laurent',
        image_principale: '',
        statut: 'publie',
        emoji: '🤖'
      },
      {
        id: 2, categorie_id: 2,
        titre: "Voyage au Japon : Guide complet pour les débutants",
        contenu: `Le Japon est une destination fascinante qui mêle tradition millénaire et modernité ultra-développée. De Tokyo à Kyoto, chaque ville offre une expérience unique et inoubliable.\n\nCommencez votre voyage à Tokyo, la capitale dynamique. Shibuya, Akihabara, Asakusa — chaque quartier a sa personnalité propre. Le mont Fuji est incontournable pour les amateurs de randonnée.\n\nKyoto, l'ancienne capitale impériale, regorge de temples bouddhistes et de jardins zen. Arashiyama et son célèbre bambouseraie, Fushimi Inari et ses milliers de torii rouges... La magie est partout.`,
        date_publication: '2025-02-20T14:30:00',
        auteur: 'Thomas Dubois',
        image_principale: '',
        statut: 'publie',
        emoji: '🗾'
      },
      {
        id: 3, categorie_id: 3,
        titre: "La Cuisine Marocaine : Secrets et Recettes Traditionnelles",
        contenu: `La cuisine marocaine est l'une des plus riches et des plus variées du monde. Mélange d'influences berbères, arabes, méditerranéennes et andalouses, elle offre une palette de saveurs extraordinaire.\n\nLe tajine est sans doute le plat le plus emblématique. Cuit lentement dans un plat en terre cuite, il peut être préparé avec du poulet, de l'agneau ou des légumes, toujours agrémenté d'épices soigneusement dosées.\n\nLa harira, soupe nourrissante à base de tomates, lentilles et pois chiches, est incontournable pendant le Ramadan. Et n'oublions pas la pastilla, ce feuilleté sucré-salé à la volaille, véritable chef-d'œuvre de la gastronomie.`,
        date_publication: '2025-01-10T09:00:00',
        auteur: 'Fatima Amrani',
        image_principale: '',
        statut: 'publie',
        emoji: '🍲'
      },
      {
        id: 4, categorie_id: 4,
        titre: "Exploration de Mars : Les Dernières Découvertes",
        contenu: `Les missions martiennes récentes ont révélé des données fascinantes sur la planète rouge. Les rovers Perseverance et Curiosity continuent d'explorer la surface avec des résultats remarquables.\n\nDes traces d'eau ancienne ont été découvertes dans plusieurs régions, suggérant que Mars a connu un passé plus clément. Des minéraux organiques ont également été détectés, alimentant les spéculations sur une possible vie primitive.\n\nLes projets d'exploration humaine de Mars avancent. SpaceX, NASA et d'autres agences spatiales travaillent activement à des missions habitées prévues pour les années 2030.`,
        date_publication: '2025-04-05T16:00:00',
        auteur: 'Jean-Pierre Moreau',
        image_principale: '',
        statut: 'publie',
        emoji: '🚀'
      },
      {
        id: 5, categorie_id: 5,
        titre: "Le Jazz : Une Histoire d'Innovation et de Liberté",
        contenu: `Né à la Nouvelle-Orléans au début du XXe siècle, le jazz est bien plus qu'un genre musical — c'est une philosophie de la liberté d'expression et de l'improvisation.\n\nDes pionniers comme Louis Armstrong et Duke Ellington ont défini les bases de ce langage musical unique. Miles Davis a révolutionné le genre avec le cool jazz puis le jazz fusion. John Coltrane a repoussé les limites avec ses explorations harmoniques audacieuses.\n\nAujourd'hui, le jazz continue d'évoluer, absorbant des influences du hip-hop, de la musique électronique et des traditions musicales du monde entier.`,
        date_publication: '2025-03-28T11:00:00',
        auteur: 'Sophie Renard',
        image_principale: '',
        statut: 'publie',
        emoji: '🎷'
      },
      {
        id: 6, categorie_id: 1,
        titre: "Python vs JavaScript : Quel langage choisir en 2025 ?",
        contenu: `Python et JavaScript sont deux des langages les plus populaires du moment. Chacun a ses forces et ses domaines de prédilection.\n\nPython excelle dans la data science, le machine learning et l'automatisation. Sa syntaxe claire et ses bibliothèques riches comme NumPy, Pandas et TensorFlow en font le choix de référence pour les data scientists.\n\nJavaScript, quant à lui, domine le développement web front-end et est désormais présent côté serveur avec Node.js. Son écosystème React/Vue/Angular est incontournable pour les développeurs web.`,
        date_publication: '2025-04-18T10:00:00',
        auteur: 'Alex Chen',
        image_principale: '',
        statut: 'brouillon',
        emoji: '💻'
      }
    ];
    localStorage.setItem('mb_articles', JSON.stringify(articles));
  },

  getArticles(statut = null, categorie_id = null, search = null) {
    let arts = JSON.parse(localStorage.getItem('mb_articles')) || [];
    if (statut) arts = arts.filter(a => a.statut === statut);
    if (categorie_id) arts = arts.filter(a => a.categorie_id == categorie_id);
    if (search) {
      const q = search.toLowerCase();
      arts = arts.filter(a =>
        a.titre.toLowerCase().includes(q) ||
        a.contenu.toLowerCase().includes(q)
      );
    }
    return arts.sort((a, b) => new Date(b.date_publication) - new Date(a.date_publication));
  },

  getArticleById(id) {
    const arts = JSON.parse(localStorage.getItem('mb_articles')) || [];
    return arts.find(a => a.id == id);
  },

  addArticle(data) {
    const arts = JSON.parse(localStorage.getItem('mb_articles')) || [];
    const id = arts.length ? Math.max(...arts.map(a => a.id)) + 1 : 1;
    const article = { id, ...data, date_publication: new Date().toISOString(), emoji: '📝' };
    arts.push(article);
    localStorage.setItem('mb_articles', JSON.stringify(arts));
    return id;
  },

  updateArticle(id, data) {
    const arts = JSON.parse(localStorage.getItem('mb_articles')) || [];
    const idx = arts.findIndex(a => a.id == id);
    if (idx !== -1) {
      arts[idx] = { ...arts[idx], ...data };
      localStorage.setItem('mb_articles', JSON.stringify(arts));
      return true;
    }
    return false;
  },

  deleteArticle(id) {
    let arts = JSON.parse(localStorage.getItem('mb_articles')) || [];
    arts = arts.filter(a => a.id != id);
    localStorage.setItem('mb_articles', JSON.stringify(arts));
    // Supprimer aussi les commentaires (CASCADE)
    let coms = JSON.parse(localStorage.getItem('mb_commentaires')) || [];
    coms = coms.filter(c => c.article_id != id);
    localStorage.setItem('mb_commentaires', JSON.stringify(coms));
  },

  // ---- COMMENTAIRES ----
  seedCommentaires() {
    const coms = [
      { id: 1, article_id: 1, pseudo: 'Alice', email: 'alice@email.com', contenu: 'Article très intéressant ! L\'IA évolue vraiment vite.', date_commentaire: '2025-03-16T08:00:00', approuve: true },
      { id: 2, article_id: 1, pseudo: 'Bob123', email: 'bob@email.com', contenu: 'Je pense que les risques sont sous-estimés. Il faut plus de régulation.', date_commentaire: '2025-03-17T14:00:00', approuve: true },
      { id: 3, article_id: 2, pseudo: 'Yuki', email: 'yuki@email.com', contenu: 'J\'ai visité le Japon l\'été dernier, c\'est magique !', date_commentaire: '2025-02-21T09:00:00', approuve: true },
      { id: 4, article_id: 2, pseudo: 'Marco', email: 'marco@email.com', contenu: 'Super guide, je prépare mon voyage pour cet été grâce à cet article.', date_commentaire: '2025-02-22T16:00:00', approuve: false },
      { id: 5, article_id: 3, pseudo: 'Amina', email: 'amina@email.com', contenu: 'La recette de la harira de ma grand-mère est encore meilleure !', date_commentaire: '2025-01-11T10:00:00', approuve: true }
    ];
    localStorage.setItem('mb_commentaires', JSON.stringify(coms));
  },

  getCommentaires(article_id = null, approuve = null) {
    let coms = JSON.parse(localStorage.getItem('mb_commentaires')) || [];
    if (article_id) coms = coms.filter(c => c.article_id == article_id);
    if (approuve !== null) coms = coms.filter(c => c.approuve === approuve);
    return coms.sort((a, b) => new Date(b.date_commentaire) - new Date(a.date_commentaire));
  },

  addCommentaire(data) {
    const coms = JSON.parse(localStorage.getItem('mb_commentaires')) || [];
    const id = coms.length ? Math.max(...coms.map(c => c.id)) + 1 : 1;
    const com = { id, ...data, date_commentaire: new Date().toISOString(), approuve: false };
    coms.push(com);
    localStorage.setItem('mb_commentaires', JSON.stringify(coms));
    return id;
  },

  approuverCommentaire(id) {
    const coms = JSON.parse(localStorage.getItem('mb_commentaires')) || [];
    const idx = coms.findIndex(c => c.id == id);
    if (idx !== -1) { coms[idx].approuve = true; localStorage.setItem('mb_commentaires', JSON.stringify(coms)); }
  },

  supprimerCommentaire(id) {
    let coms = JSON.parse(localStorage.getItem('mb_commentaires')) || [];
    coms = coms.filter(c => c.id != id);
    localStorage.setItem('mb_commentaires', JSON.stringify(coms));
  },

  // ---- ADMIN ----
  seedAdmin() {
    const admin = { login: 'admin', mot_de_passe: 'admin123' };
    localStorage.setItem('mb_admin', JSON.stringify(admin));
  },

  verifierAdmin(login, password) {
    const admin = JSON.parse(localStorage.getItem('mb_admin'));
    return admin && admin.login === login && admin.mot_de_passe === password;
  },

  isLoggedIn() {
    return sessionStorage.getItem('mb_logged') === 'true';
  },

  login(login, password) {
    if (this.verifierAdmin(login, password)) {
      sessionStorage.setItem('mb_logged', 'true');
      return true;
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem('mb_logged');
  }
};

// ---- Utilitaires ----
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showNotification(msg, type = 'success') {
  const old = document.querySelector('.notification');
  if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'notification';
  div.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
    background:${type === 'success' ? '#28a745' : '#dc3545'};
    color:#fff; padding:0.8rem 1.4rem; border-radius:5px;
    font-family:'Source Sans 3',sans-serif; font-size:0.95rem;
    box-shadow:0 4px 20px rgba(0,0,0,0.2); animation: slideIn 0.3s ease;
  `;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
