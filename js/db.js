// ============================================
//  MinimalBlog — Base de données (localStorage)
// ============================================

const DB = {

  // ---- Initialisation des données de démo ----
  init() {
    const CURRENT_VERSION = 'v5';
    if (localStorage.getItem('mb_data_version') !== CURRENT_VERSION) {
      localStorage.removeItem('mb_initialized');
      localStorage.removeItem('mb_initialized_v2');
      localStorage.removeItem('mb_initialized_v3');
      localStorage.removeItem('mb_categories');
      localStorage.removeItem('mb_articles');
      localStorage.removeItem('mb_commentaires');
      localStorage.removeItem('mb_admin');
      this.seedCategories();
      this.seedArticles();
      this.seedCommentaires();
      this.seedAdmin();
      localStorage.setItem('mb_data_version', CURRENT_VERSION);
    }
  },

  reset() {
    localStorage.removeItem('mb_data_version');
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
      // ═══════════════════════════════════
      // TECHNOLOGIE
      // ═══════════════════════════════════
      {
        id: 1, categorie_id: 1,
        titre: "L'Intelligence Artificielle en 2025 : État des lieux",
        contenu: `L'intelligence artificielle a cessé d'être une promesse pour devenir une réalité quotidienne. En l'espace de trois ans seulement, les modèles de langage sont passés de curiosités de laboratoire à des assistants indispensables pour des millions de professionnels à travers le monde.\n\nLes grands modèles de langage — GPT-4, Claude, Gemini, Llama — ont franchi un cap décisif : ils ne se contentent plus de reformuler des textes, ils raisonnent, planifient et génèrent du code fonctionnel. Des chirurgiens utilisent l'IA pour analyser des scanners en quelques secondes. Des avocats délèguent la revue documentaire. Des architectes génèrent des centaines de variantes de plans en un après-midi.\n\nMais derrière cette effervescence se cachent des questions fondamentales. Les biais algorithmiques reproduisent et amplifient les inégalités sociales existantes. Des études montrent que certains systèmes de reconnaissance faciale affichent des taux d'erreur cinq fois plus élevés pour les femmes à peau foncée que pour les hommes à peau claire. Comment corriger un biais quand les données d'entraînement reflètent un monde déjà biaisé ?\n\nL'impact sur l'emploi divise les économistes. Les optimistes citent la révolution industrielle : chaque vague d'automatisation a finalement créé plus d'emplois qu'elle n'en a détruits. Les pessimistes rétorquent que cette fois, l'IA menace simultanément les cols bleus ET les cols blancs — une première historique. Les radiologues, les juristes, les comptables, les journalistes : aucune profession intellectuelle n'est épargnée.\n\nL'Union européenne a adopté l'AI Act en 2024, premier cadre réglementaire complet au monde. Il classe les systèmes IA par niveau de risque et impose des obligations strictes pour les applications à haut risque : recrutement automatisé, scoring de crédit, justice prédictive. Les États-Unis restent plus prudents, préférant une approche sectorielle. La Chine, de son côté, a fait de l'IA une priorité nationale stratégique avec des investissements massifs.\n\nCe qui est certain, c'est que l'IA ne reculera pas. La question n'est plus "faut-il l'adopter ?" mais "comment l'adopter intelligemment, équitablement, humainement ?" Les prochaines années seront décisives pour répondre à cette question.`,
        date_publication: '2025-05-15T10:00:00',
        auteur: 'Marie Laurent',
        image_principale: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🤖'
      },
      {
        id: 6, categorie_id: 1,
        titre: "Python vs JavaScript : Le duel des langages en 2025",
        contenu: `Il existe deux types de développeurs : ceux qui jurent par Python, et ceux qui ne peuvent pas s'en passer de JavaScript. Ce débat dépasse largement la simple préférence syntaxique — il reflète deux philosophies du développement logiciel.\n\nPython a été conçu avec une obsession pour la lisibilité. "Il devrait y avoir une — et de préférence une seule — façon évidente de faire les choses", écrivait Guido van Rossum dans le Zen of Python. Cette philosophie a fait de Python le langage de référence pour la science des données, le machine learning et l'automatisation. Les bibliothèques NumPy, Pandas, TensorFlow et PyTorch constituent un écosystème sans rival pour traiter des millions de lignes de données.\n\nJavaScript, lui, est né d'une urgence : Brendan Eich l'a créé en dix jours en 1995 pour rendre Netscape Navigator interactif. Cette origine chaotique explique ses nombreuses bizarreries (typeof null === "object", anyone ?). Mais JavaScript a survécu, évolué, et s'est imposé comme le seul langage natif du navigateur. Avec Node.js, il a conquis le serveur. Avec React Native, le mobile. Avec Electron, le desktop.\n\nPerformance : JavaScript gagne clairement pour les applications web temps réel. Python gagne pour les calculs numériques intensifs grâce à ses bibliothèques C/Fortran sous-jacentes. Productivité : les deux sont excellents, mais Python est souvent plus rapide à apprendre pour un non-développeur. Écosystème : npm contient plus de 2 millions de packages (dont beaucoup redondants ou abandonnés) ; pip est plus modeste mais de meilleure qualité moyenne.\n\nLa vraie réponse, bien sûr, est que le choix dépend du contexte. Construire un dashboard analytique interactif ? Python avec Streamlit ou Dash. Créer une API REST pour une startup ? Node.js avec Express ou Fastify sera plus rapide à déployer. Faire du machine learning ? Python sans hésitation. Créer une application web fullstack ? JavaScript/TypeScript vous permettra d'utiliser le même langage front et back.\n\nEn 2025, la frontière s'estompe. TypeScript a transformé JavaScript en langage robuste avec typage statique. Pyodide permet de faire tourner Python dans le navigateur. Les développeurs les plus demandés sont ceux qui maîtrisent les deux — et qui savent choisir le bon outil pour chaque problème.`,
        date_publication: '2025-04-18T10:00:00',
        auteur: 'Alex Chen',
        image_principale: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '💻'
      },
      {
        id: 7, categorie_id: 1,
        titre: "La Blockchain : au-delà du Bitcoin et des NFTs",
        contenu: `Après l'euphorie des cryptomonnaies et la bulle des NFTs, la blockchain cherche sa vraie vocation. Et elle est peut-être bien plus prosaïque — et révolutionnaire — qu'on ne l'imaginait.\n\nUne blockchain est fondamentalement un registre distribué et immuable. Chaque transaction est enregistrée dans un "bloc" cryptographiquement lié aux précédents, formant une chaîne impossible à falsifier rétroactivement sans recalculer l'intégralité des blocs suivants. Ce qui la rend révolutionnaire : elle permet à des parties qui ne se font pas confiance de collaborer sans intermédiaire de confiance.\n\nBeyond Bitcoin, les cas d'usage émergent dans des secteurs inattendus. La chaîne d'approvisionnement alimentaire : Walmart utilise IBM Food Trust pour tracer la provenance de ses mangues du Mexique en secondes plutôt qu'en jours — crucial pour identifier rapidement la source d'une contamination. Les diplômes universitaires : le MIT émet des diplômes vérifiables sur blockchain depuis 2017 — adieu les faux CV. L'art et la propriété intellectuelle : au-delà de la spéculation, les smart contracts permettent aux artistes de percevoir automatiquement des royalties à chaque revente.\n\nLes smart contracts méritent une attention particulière. Ce sont des programmes qui s'exécutent automatiquement quand des conditions prédéfinies sont remplies, sans qu'aucune partie ne puisse les arrêter ou les modifier. Ethereum les a popularisés. Imaginez un contrat d'assurance voyage qui verse automatiquement une indemnité si votre vol est annulé, sans formulaire ni attente — c'est aujourd'hui possible.\n\nLes limites sont réelles. La consommation énergétique du Bitcoin équivaut à celle de l'Argentine. La scalabilité reste un défi : Ethereum traite environ 30 transactions par seconde contre 24 000 pour Visa. Les solutions de "layer 2" comme Lightning Network ou Polygon tentent de résoudre ce goulot. Et la complexité technique reste une barrière à l'adoption grand public.\n\nLa vraie question n'est pas "blockchain ou pas" mais "quand une blockchain est-elle justifiée ?" La règle empirique : si vous avez besoin d'une base de données partagée entre des acteurs qui ne se font pas entièrement confiance, et que l'immuabilité et la traçabilité sont critiques, alors la blockchain a du sens. Sinon, une base de données classique fera l'affaire — et bien mieux.`,
        date_publication: '2025-03-10T09:00:00',
        auteur: 'Karim Bensaid',
        image_principale: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '⛓'
      },
      // ═══════════════════════════════════
      // VOYAGE
      // ═══════════════════════════════════
      {
        id: 2, categorie_id: 2,
        titre: "Japon : Deux Semaines entre Temples et Néons",
        contenu: `Le Japon est l'un de ces pays qui déjoue systématiquement toutes vos attentes. Vous arrivez prêt pour le choc culturel, et vous repartez avec la certitude d'avoir vécu dans un autre monde — pas hostile, mais profondément, délicieusement autre.\n\nTokyo est une agression sensorielle bienveillante. Treize millions d'habitants dans la ville-centre, trente-sept millions dans la métropole, et pourtant : pas un déchet dans la rue, des trains qui arrivent à la seconde près, une courtoisie universelle qui fait presque peur tant elle est systématique. Shibuya Crossing, le carrefour le plus fréquenté du monde, vaut seul le voyage. Le voir de nuit depuis le café Starbucks en face, c'est regarder une chorégraphie de milliers de parapluies colorés.\n\nMais Tokyo n'est que le prélude. Shinkansen direction Kyoto, l'ancienne capitale impériale. Ici le temps ralentit. Fushimi Inari et ses dix mille torii vermillon qui serpentent sur la colline — arrivez à l'aube pour éviter les foules et vivre quelque chose de presque mystique. Le Kinkaku-ji, le Pavillon d'Or, reflété dans son étang : un cliché, oui, mais certains clichés existent pour de bonnes raisons.\n\nNara, à quarante minutes de Kyoto, est la ville où des cerfs en liberté se promènent parmi les temples. Ils sont officiellement protégés depuis le VIIIe siècle. Ils le savent, et se comportent en conséquence — attendant patiemment que vous leur achetiez leurs crackers rituels, puis s'en allant avec une indifférence aristocratique.\n\nLa nourriture mérite un article à elle seule. Le ramen à Fukuoka à 2h du matin dans un minuscule yatai — ces restaurants de rue mobiles. Le sushi omakase à Osaka où le chef décide lui-même de ce que vous mangez en fonction du marché du jour. Le matcha sous toutes ses formes à Uji. Les konbinis — ces épiceries ouvertes 24h/24 — qui proposent des onigiri meilleurs que 90% des restaurants français.\n\nConseils pratiques : le JR Pass est rentable dès que vous prenez le train deux fois. IC Card pour les transports en ville. Google Maps fonctionne parfaitement. Apprenez les formules de politesse de base : "sumimasen" (excusez-moi) et "arigatou gozaimasu" (merci infiniment) ouvrent toutes les portes. Et réservez les restaurants étoilés trois mois à l'avance.`,
        date_publication: '2025-04-20T14:30:00',
        auteur: 'Thomas Dubois',
        image_principale: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🗾'
      },
      {
        id: 8, categorie_id: 2,
        titre: "Marrakech : La Ville Ocre entre Tradition et Modernité",
        contenu: `Se perdre dans la médina de Marrakech n'est pas un accident — c'est le programme. Ces ruelles labyrinthiques qui semblent conçues pour égarer les étrangers sont en réalité un système d'une logique parfaite, organisée par quartiers de métiers : les teinturiers, les brodeurs, les forgerons, les potiers, chacun dans sa rue depuis des siècles.\n\nLa place Djemaa El-Fna est l'un des spectacles vivants les plus extraordinaires de la planète. Le matin, des jus d'orange fraîchement pressés et des étals d'épices. L'après-midi, des charmeurs de serpents et des singes savants (avec lesquels je vous déconseille fortement de vous faire photographier). Le soir, la place se transforme en un immense restaurant à ciel ouvert : des dizaines de cuisiniers crient leurs spécialités depuis leurs étals fumants, et l'air embaume le cumin, la harissa et la graisse de merguez.\n\nLes riads — ces maisons traditionnelles ouvertes sur une cour intérieure — sont la façon parfaite de dormir à Marrakech. Entrance modeste sur la rue, mais franchissez la porte : vous découvrez un jardin secret avec fontaine, orangers en pot et silence improbable. Les meilleurs se trouvent dans le quartier de la Mouassine ou près des tanneries de Bab Debbagh.\n\nLa Palmeraie, les jardins Majorelle avec leurs cobalt Klein et leur jaune vif (rachetés par Yves Saint Laurent en 1980), le Musée Yves Saint Laurent inauguré en 2017 juste en face — Marrakech a su marier luxe international et âme africaine sans perdre son identité. La Mamounia reste le palace mythique, fréquenté par Churchill qui venait y peindre. Winston y a décrit Marrakech comme "le plus beau spectacle du monde".\n\nPratique : la médina se visite à pied, inévitablement. Marchandage obligatoire dans les souks — commencez à 30% du prix annoncé. Les taxis rouges sont réglementés mais n'utilisent jamais le compteur ; négociez avant de monter. Évitez juillet-août (chaleur écrasante, 45°C), préférez mars-avril ou octobre-novembre. Et méfiez-vous des "guides" non officiels qui vous mèneront inévitablement chez leur cousin tailleur.`,
        date_publication: '2025-02-14T11:00:00',
        auteur: 'Nadia Fassi',
        image_principale: 'https://images.pexels.com/photos/3581352/pexels-photo-3581352.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🕌'
      },
      {
        id: 13, categorie_id: 2,
        titre: "Lisbonne : La Mélancolie Dorée du Fado",
        contenu: `Il y a dans Lisbonne quelque chose d'indéfinissable — une lumière particulière, océanique et chaude à la fois, qui dore les façades couvertes d'azulejos et donne à la ville une nostalgie élégante. Les Portugais ont un mot pour ça : saudade. Une mélancolie douce pour quelque chose qu'on a peut-être jamais vraiment eu.\n\nLisbonne est une ville de collines, de trams grinçants et de miradouros — ces belvédères perchés d'où l'on contemple la ville et le Tage. Le miradouro da Graça au coucher du soleil, avec un verre de ginjinha (liqueur de cerise) dans la main, est un des moments les plus simples et les plus parfaits qu'une ville européenne puisse offrir.\n\nAlfama est le quartier qui résume tout. Construit sur la colline qui a survécu au tremblement de terre de 1755 grâce à ses ruelles trop étroites pour que les bâtiments s'effondrent les uns sur les autres, c'est le berceau du fado. Le soir, dans les casas de fado authentiques (évitez les pièges à touristes de la rue principale), une fadista vêtue de noir chante l'amour perdu et la mer avec une voix qui brise quelque chose en vous que vous ne saviez pas avoir.\n\nLa scène gastronomique lisboète a explosé ces dernières années. Bacalhau — la morue salée — se décline en 365 recettes (une par jour de l'année, selon la tradition). Les pastéis de nata de Belém, chauds, saupoudrés de cannelle, avec leur pâte feuilletée craquante, sont une expérience transcendante. Les mercados, et notamment le Time Out Market, regroupent sous un même toit les meilleurs chefs de la ville.\n\nLisbonne reste l'une des capitales européennes les plus abordables — pour combien de temps encore, c'est une autre question. La ville attire des nomades digitaux et des retraités étrangers qui font grimper les prix de l'immobilier. Venez maintenant, avant que la gentrification n'efface cette patine unique.`,
        date_publication: '2025-01-28T16:00:00',
        auteur: 'Thomas Dubois',
        image_principale: 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🇵🇹'
      },
      // ═══════════════════════════════════
      // CUISINE
      // ═══════════════════════════════════
      {
        id: 3, categorie_id: 3,
        titre: "La Cuisine Marocaine : Un Voyage de Saveurs",
        contenu: `La cuisine marocaine est une mémoire vivante. Chaque épice dans le ras el-hanout raconte un itinéraire commercial, chaque technique de cuisson porte l'empreinte d'une civilisation. Berbères, Arabes, Andalous, Ottomans, juifs séfarades — toutes ces cultures ont laissé leur trace dans les marmites marocaines.\n\nLe tajine est bien plus qu'un plat — c'est une philosophie culinaire. Ce couvercle conique n'est pas décoratif : il crée une circulation de vapeur qui condense et retombe en pluie fine sur les ingrédients, permettant une cuisson à basse température qui préserve les arômes et attendrit les viandes les plus coriaces. Un poulet-citron confit-olives qui a mijoté quatre heures est une leçon d'humilité pour tout cuisinier pressé.\n\nLe ras el-hanout — littéralement "la tête de l'épicerie", c'est-à-dire le mélange du meilleur — peut contenir jusqu'à 30 épices différentes : cannelle, gingembre, cumin, coriandre, cardamome, poivre noir, safran, cubèbe, galanga... Chaque épicier a sa recette secrète, transmise de père en fils. Acheter son ras el-hanout dans les souks de Fès ou de Marrakech, le voir peser et mélanger devant vous, c'est assister à une alchimie.\n\nLa b'stilla (ou pastilla) est peut-être la préparation la plus emblématique de cette complexité. Feuilleté de warka — une pâte aussi fine qu'un voile — farci de pigeon (ou de poulet) effiloché aux amandes grillées, saupoudré de sucre glace et de cannelle. Sucré-salé-croustillant, ce plat reflète l'influence andalouse : les Maures chassés d'Espagne ont importé au Maroc le goût pour le sucre dans les plats salés.\n\nLe couscous du vendredi est une institution sociale autant que culinaire. La semoule, roulée à la main et cuite à la vapeur trois fois (pas deux, pas une — trois, insiste ma hôte à Fès), servie avec sept légumes et de l'agneau, réunit toute la famille. Le nombre sept n'est pas anodin : il porte bonheur. Et le bouillon parfumé au curcuma, à la fleur de courgette séchée, versé dans un bol séparé pour le boire en dernier — c'est le summum de l'hospitalité marocaine.`,
        date_publication: '2025-03-10T09:00:00',
        auteur: 'Fatima Amrani',
        image_principale: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🍲'
      },
      {
        id: 9, categorie_id: 3,
        titre: "L'Art du Sushi : Tradition, Technique et Umami",
        contenu: `Un bon sushi est une leçon de philosophie. Il vous enseigne que la perfection tient à peu de chose — quelques grammes de riz à la bonne température, un couteau parfaitement aiguisé, et des années de pratique pour que le geste devienne instinct.\n\nLe sushi tel que nous le connaissons est relativement récent : le nigiri moderne a été inventé à Tokyo (alors Edo) au début du XIXe siècle par Hanaya Yohei. Avant lui existait le narezushi — du poisson fermenté dans du riz pendant des mois, voire des années. Le riz n'était pas mangé, il servait uniquement à la fermentation. Le narezushi existe encore au Japon, notamment autour du lac Biwa ; c'est un goût acquis, clairement.\n\nLe riz à sushi est la fondation. Il doit être un riz japonais à grain court, cuit avec précision, puis assaisonné avec du vinaigre de riz, du sucre et du sel dans des proportions que chaque chef garde secrètes. La température est cruciale : le riz doit être à température du corps humain — ni froid, ni chaud. Trop froid, il durcit. Trop chaud, il dénature le poisson cru.\n\nL'omakase — littéralement "je m'en remets à vous" — est la façon ultime de manger des sushis. Vous vous asseyez au comptoir, face au chef, et vous lui faites confiance pour composer votre repas en fonction des arrivages du jour. Pas de carte. Pas de choix. Un sushi à la fois, servi directement sur le bois du comptoir ou dans la main. C'est une conversation silencieuse entre le cuisinier et le mangeur, une cérémonie dont le rythme est dicté par le chef.\n\nLe wasabi véritable — le rhizome râpé d'Eutrema japonicum — n'a rien à voir avec la pâte verte des restaurants bas de gamme, qui est en réalité du raifort coloré. Le vrai wasabi a une chaleur fugace et florale, très différente de la brûlure persistante du raifort. Il se râpe sur une râpe en requin (samegawa-oroshi) juste avant le service, car il s'oxyde en quelques minutes. En dehors du Japon, le trouver reste rare et cher.`,
        date_publication: '2025-02-05T12:00:00',
        auteur: 'Hana Yoshida',
        image_principale: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🍣'
      },
      // ═══════════════════════════════════
      // SCIENCE
      // ═══════════════════════════════════
      {
        id: 4, categorie_id: 4,
        titre: "Mars 2025 : Ce que les Rovers ont Découvert",
        contenu: `Le 18 février 2021, Perseverance atterrissait dans le cratère Jezero sur Mars. Ce cratère n'a pas été choisi par hasard : les images orbitales suggèrent qu'il était un lac il y a 3,5 milliards d'années, avec un delta de rivière visible à l'œil nu. Si la vie a jamais existé sur Mars, c'est là qu'elle aurait laissé des traces.\n\nQuatre ans plus tard, Perseverance a collecté 23 tubes d'échantillons géologiques — les plus précieux cailloux de l'histoire spatiale. Parmi eux, des roches sédimentaires formées sous l'eau, des carbonates (qui sur Terre se forment souvent autour de sources hydrothermales biologiquement actives), et des teneurs élevées en silice — un marqueur fort d'activité hydrothermale ancienne.\n\nMais c'est Ingenuity, l'hélicoptère de la taille d'une boîte à chaussures, qui a volé la vedette. Conçu pour effectuer cinq vols de test, il en a réalisé 72 avant de souffrir d'une défaillance de ses pales. Il a prouvé définitivement que le vol motorisé est possible dans l'atmosphère martienne — 100 fois plus fine que celle de la Terre. Les futures missions envisagent déjà des drones de reconnaissance de plusieurs dizaines de kilos.\n\nLa question "y a-t-il de la vie sur Mars ?" reste sans réponse, et le restera jusqu'au retour des échantillons. La mission MSR (Mars Sample Return), co-dirigée par NASA et ESA, vise à ramener les tubes de Perseverance sur Terre autour de 2033. Ce sera la première fois dans l'histoire que des roches d'une autre planète sont analysées dans des laboratoires terrestres — avec des instruments qui ne peuvent tout simplement pas être miniaturisés pour tenir dans un rover.\n\nPendant ce temps, la question de la colonisation avance. SpaceX a effectué plusieurs vols tests de Starship, le vaisseau conçu pour transporter des humains jusqu'à Mars. Elon Musk parle de 2029 pour un premier vol habité. La NASA est plus prudente : 2040 au plus tôt. Entre les deux, des enjeux considérables : la radiation cosmique (qui doublerait le risque de cancer sur le trajet), la perte de densité osseuse en microgravité, et le simple fait qu'un aller-retour prend neuf mois minimum.`,
        date_publication: '2025-05-01T16:00:00',
        auteur: 'Jean-Pierre Moreau',
        image_principale: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🚀'
      },
      {
        id: 10, categorie_id: 4,
        titre: "CRISPR-Cas9 : Réécrire le Code du Vivant",
        contenu: `En 2012, Jennifer Doudna et Emmanuelle Charpentier publiaient un article qui allait changer la biologie pour toujours. Elles décrivaient comment le système immunitaire des bactéries — CRISPR — pouvait être reprogrammé pour couper l'ADN à n'importe quel endroit précis du génome. En 2020, le Prix Nobel de Chimie récompensait cette découverte. Entre les deux : une révolution.\n\nCRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) n'est pas une invention humaine. C'est un mécanisme bactérien vieux de milliards d'années, une sorte de système immunitaire primitif. Quand un virus attaque une bactérie et qu'elle survive, la bactérie "mémorise" des fragments du génome viral et les stocke dans ses propres gènes — les fameux CRISPR. Lors d'une prochaine attaque, elle reconnaît l'intrus et envoie des "ciseaux moléculaires" — la protéine Cas9 — le découper.\n\nDoudna et Charpentier ont compris qu'on pouvait guider ces ciseaux n'importe où dans n'importe quel génome, pas seulement contre des virus. Il suffit de fabriquer un "guide RNA" — une petite molécule de 20 lettres génétiques qui correspond à la séquence cible. La Cas9 suit le guide, trouve la séquence dans l'ADN, et coupe. Précision chirurgicale, coût dérisoire par rapport aux techniques précédentes.\n\nLes applications médicales avancent à grande vitesse. En 2023, la FDA américaine a approuvé Casgevy — le premier traitement CRISPR au monde — pour la drépanocytose et la bêta-thalassémie. Ces maladies génétiques du sang qui condamnaient leurs porteurs à des transfusions régulières et une espérance de vie réduite peuvent maintenant être guéries en une seule intervention. Des centaines de patients ont été traités, avec des résultats spectaculaires.\n\nMais les questions éthiques sont immenses. En 2018, le scientifique chinois He Jiankui a modifié le génome d'embryons humains pour les rendre résistants au VIH, créant les premières "bébés CRISPR" de l'histoire. La communauté scientifique mondiale s'est levée comme un seul homme pour condamner cette expérience irresponsable — non pas parce que c'est impossible, mais parce que les modifications sont transmissibles à la descendance, changeant à jamais le patrimoine génétique de l'humanité. He Jiankui a été condamné à trois ans de prison. La question reste entière : où se trouve la ligne rouge ?`,
        date_publication: '2025-03-22T14:00:00',
        auteur: 'Dr. Leila Mansouri',
        image_principale: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🧬'
      },
      {
        id: 14, categorie_id: 4,
        titre: "Trous Noirs : Les Géants Invisibles de l'Univers",
        contenu: `En 2019, une image a fait le tour du monde : une tache lumineuse en forme d'anneau sur fond de ténèbres, à 55 millions d'années-lumière de la Terre. Pour la première fois de l'histoire, l'humanité regardait un trou noir en face. C'était M87*, un monstre de 6,5 milliards de masses solaires, photographié grâce à un réseau de huit radiotélescopes répartis sur toute la planète — l'Event Horizon Telescope.\n\nUn trou noir n'est pas un aspirateur cosmique, contrairement à la représentation populaire. C'est une région de l'espace où la gravité est si intense qu'elle courbe l'espace-temps sur lui-même. À l'horizon des événements — la "surface" du trou noir — la vitesse de libération atteint celle de la lumière. Rien, pas même la lumière, ne peut s'en échapper. Ce n'est pas qu'elle est "aspirée" : c'est que l'espace lui-même est courbé de façon à ce que toutes les trajectoires pointent vers l'intérieur.\n\nLes trous noirs stellaires naissent quand une étoile d'au moins 20 masses solaires termine sa vie en supernova. Le cœur effondré dépasse la limite de Tolman-Oppenheimer-Volkoff : plus aucune force n'est capable de contrebalancer la gravité. L'effondrement est total. Les trous noirs supermassifs — ceux qui trônent au centre des galaxies — ont des origines encore mystérieuses. Comment sont-ils devenus si gros ? Coalescences de trous noirs stellaires ? Formation directe dans l'univers jeune ? La question reste ouverte.\n\nLe paradoxe de l'information est l'un des problèmes les plus profonds de la physique théorique. Si tout ce qui tombe dans un trou noir est détruit, cela viole un principe fondamental de la mécanique quantique : l'information ne peut pas être détruite. Hawking a proposé que les trous noirs "rayonnent" lentement des particules — le rayonnement de Hawking — et s'évaporent sur des échelles de temps astronomiques. Mais où va l'information ? Ce débat oppose depuis quarante ans les partisans de la relativité générale à ceux de la mécanique quantique.`,
        date_publication: '2025-01-15T10:00:00',
        auteur: 'Jean-Pierre Moreau',
        image_principale: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🌌'
      },
      // ═══════════════════════════════════
      // CULTURE
      // ═══════════════════════════════════
      {
        id: 5, categorie_id: 5,
        titre: "Le Jazz : Improvisation, Liberté et Génie Collectif",
        contenu: `Il y a une phrase célèbre attribuée à Louis Armstrong : "Si vous devez demander ce qu'est le jazz, vous ne le saurez jamais." Cette boutade cache une vérité profonde : le jazz se vit avant de se définir. C'est une musique de l'instant, de l'accident heureux, du dialogue entre musiciens qui s'écoutent véritablement.\n\nNé dans les quartiers noirs de La Nouvelle-Orléans au tournant du XXe siècle, le jazz est le fruit d'une alchimie culturelle unique. Les blues et les spirituals afro-américains, les rythmes africains des "Congo Square" où les esclaves pouvaient se rassembler le dimanche, les harmonies européennes importées par les créoles de couleur qui avaient étudié la musique en France — tout cela a fermenté dans la chaleur moite de la Louisiane pour produire quelque chose d'entièrement nouveau.\n\nBuddy Bolden, Louis Armstrong, King Oliver — les pionniers. Puis Harlem dans les années 1920 : Duke Ellington au Cotton Club, les grands orchestres de swing qui font danser l'Amérique blanche et noire dans des salles encore séparées par la ségrégation. La contradiction douloureuse de musiciens géniaux qui entrent par la porte de service dans les clubs où ils sont têtes d'affiche.\n\nBebop, dans les années 1940, est la grande rupture. Charlie Parker et Dizzy Gillespie jouent plus vite, plus haut, plus dissonant — exprès pour que la musique soit trop complexe pour être dansée et appropriée par l'industrie du divertissement blanc. C'est un acte politique autant qu'artistique. Miles Davis invente ensuite le cool jazz (Birth of the Cool, 1957), puis le hard bop, puis le jazz fusion — chaque décennie, il se réinvente, refusant d'être enfermé dans une case.\n\nAujourd'hui, le jazz est vivant d'une façon que ses détracteurs n'auraient pas prédit. Kamasi Washington remplit des salles avec un saxophone ténor et un son qui emprunte autant à Coltrane qu'au hip-hop. Robert Glasper efface les frontières entre jazz et R&B. Esperanza Spalding a remporté un Grammy de meilleur artiste révélation contre Justin Bieber en 2011. La tradition continue : l'improvisation, le dialogue, la liberté — dans tous les genres, sous toutes les formes.`,
        date_publication: '2025-04-28T11:00:00',
        auteur: 'Sophie Renard',
        image_principale: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🎷'
      },
      {
        id: 11, categorie_id: 5,
        titre: "La Nouvelle Vague : Quand le Cinéma Français a Réinventé le 7e Art",
        contenu: `En 1959, François Truffaut présente Les 400 Coups à Cannes. Il a 27 ans, n'a jamais fait de long-métrage, et il repart avec le Prix de la mise en scène. La même année, Jean-Luc Godard tourne À Bout de Souffle en quatre semaines pour deux millions de francs, avec une caméra portée à l'épaule dans les rues de Paris. La Nouvelle Vague est née.\n\nCe qui est révolutionnaire dans la Nouvelle Vague, ce n'est pas seulement l'esthétique — les jump cuts de Godard, les plans-séquences de Truffaut, la caméra handheld d'Agnès Varda. C'est une théorie : l'auteur. Les Cahiers du Cinéma, où Truffaut, Godard, Chabrol et Rivette étaient critiques avant d'être cinéastes, défendaient l'idée que le metteur en scène est le véritable auteur d'un film, comme un romancier de son livre. Le cinéma cessait d'être une industrie de divertissement pour devenir un art à part entière.\n\nLa liberté économique allait de pair avec la liberté artistique. Ces jeunes réalisateurs tournaient avec de petites équipes, du matériel léger, dans des décors naturels plutôt qu'en studio — par nécessité autant que par choix. Jean Seberg courant dans les Champs-Élysées avec son exemplaire du New York Herald Tribune, Jean-Paul Belmondo dans un appartement parisien ordinaire — le cinéma quittait les plateaux pour la vraie vie.\n\nL'influence sur le cinéma mondial est difficile à exagérer. Martin Scorsese, Francis Ford Coppola, Woody Allen, Steven Spielberg — tous citent la Nouvelle Vague comme influence fondatrice. Le New Hollywood des années 1970 est directement inspiré par ces Français qui faisaient des films avec des bouts de ficelle et des idées folles. Et plus récemment, les films de Michel Gondry, Xavier Dolan, ou Céline Sciamma portent en eux l'héritage de cette révolution.\n\nCinquante ans après, certains films de la Nouvelle Vague semblent d'une fraîcheur déconcertante. Cléo de 5 à 7 d'Agnès Varda (1962) suit en temps réel une femme qui attend les résultats d'un test médical — une plongée dans le Paris des années 1960 et dans l'angoisse existentielle d'une façon que beaucoup de films contemporains n'osent pas. La Nuit américaine de Truffaut, Pierrot le Fou de Godard, Ma Nuit chez Maud de Rohmer : allez les voir ou les revoir. Ils n'ont pas pris une ride.`,
        date_publication: '2025-02-20T15:00:00',
        auteur: 'Sophie Renard',
        image_principale: 'https://images.pexels.com/photos/65128/pexels-photo-65128.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🎬'
      },
      {
        id: 12, categorie_id: 5,
        titre: "Architecture Islamique : Géométrie, Lumière et Infini",
        contenu: `Il existe des espaces qui font quelque chose au corps humain avant même que l'esprit commence à les analyser. La salle de prière de la Mosquée-Cathédrale de Cordoue, avec ses 856 colonnes bicolores à perte de vue, produit un effet qui tient du vertige et de l'émerveillement mêlés. L'Alhambra de Grenade, avec ses mouqarnas — ces stalactites géométriques en plâtre sculpté — semble fait d'une matière qui n'obéit pas aux lois habituelles de la physique.\n\nL'architecture islamique classique, du VIIe au XVe siècle, a développé un vocabulaire visuel d'une sophistication sans équivalent. Les arabesques ne sont pas des décorations : elles sont des méditations sur l'infini. Une arabesque est un motif géométrique qui se répète et se développe indéfiniment, suggérant un espace sans limite — une métaphore visuelle de l'infinité divine que les représentations figuratives ne peuvent pas capturer.\n\nLes géométries islamiques sont d'une complexité mathématique impressionnante. Certains carreaux de zellige ou certains panneaux de bois sculpté d'Asie centrale arborent des motifs quasi-cristallins — des structures dont les mathématiciens occidentaux n'ont formalisé l'existence qu'au XXe siècle. Comment des artisans médiévaux sans calculatrice ont-ils construit ces structures ? La question reste partiellement ouverte.\n\nLa maîtrise de la lumière est une autre constante. Les moucharabiehs — ces grilles de bois tourné aux ouvertures variables — diffusent la lumière solaire tout en préservant l'intimité et en filtrant la chaleur. Les vitraux de la mosquée Shah à Ispahan transforment la lumière du soleil en une plongée colorée irréelle. Dans la mosquée Sultan Hassan au Caire, quatre iwans cruciformes captent la lumière à toutes les heures du jour.\n\nL'héritage architectural islamique est aujourd'hui menacé par les conflits armés, l'urbanisation anarchique et le manque de fonds pour la restauration. Alep, Mossoul, Palmyre — des villes entières ont perdu des monuments irremplaçables. Mais cet héritage est aussi vivant : des architectes contemporains comme Zaha Hadid ou Diller Scofidio + Renfro s'en nourrissent pour créer des espaces qui interrogent nos certitudes sur la forme et l'espace.`,
        date_publication: '2025-01-05T10:00:00',
        auteur: 'Karim Bensaid',
        image_principale: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=900',
        statut: 'publie',
        emoji: '🕌'
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
      // Article 1 — IA
      { id: 1,  article_id: 1,  pseudo: 'Alice M.',     email: 'alice@email.com',   contenu: 'Article remarquable ! Ce point sur les biais algorithmiques est crucial et encore trop peu discuté dans la presse grand public. Merci pour cette synthèse équilibrée.',                                   date_commentaire: '2025-05-16T08:00:00', approuve: true  },
      { id: 2,  article_id: 1,  pseudo: 'Bob_Dev',      email: 'bob@email.com',     contenu: 'En tant que développeur IA, je confirme que les questions éthiques ne sont pas des obstacles mais des garde-fous nécessaires. L\'AI Act européen est un pas dans la bonne direction.',                   date_commentaire: '2025-05-17T14:00:00', approuve: true  },
      { id: 3,  article_id: 1,  pseudo: 'Professeur R', email: '',                  contenu: 'L\'analogie avec la révolution industrielle est pertinente mais incomplète. Cette fois le rythme de disruption est bien plus rapide. Nos systèmes de formation ont-ils le temps de s\'adapter ?',       date_commentaire: '2025-05-18T10:30:00', approuve: true  },
      { id: 4,  article_id: 1,  pseudo: 'CuriousOne',   email: '',                  contenu: 'Très bon résumé. Juste une question : pensez-vous que l\'IA générale (AGI) est pour bientôt ou c\'est encore de la science-fiction ?',                                                                  date_commentaire: '2025-05-19T09:00:00', approuve: false },
      // Article 2 — Japon
      { id: 5,  article_id: 2,  pseudo: 'Yuki T.',      email: 'yuki@email.com',    contenu: 'Je suis Japonaise et j\'adore voir comment les étrangers découvrent mon pays. La description de Fushimi Inari à l\'aube est parfaite — c\'est vraiment l\'heure qu\'il faut y aller.',                   date_commentaire: '2025-04-21T09:00:00', approuve: true  },
      { id: 6,  article_id: 2,  pseudo: 'Marco_V',      email: 'marco@email.com',   contenu: 'Je pars en septembre grâce à cet article ! La section sur Nara et les cerfs m\'a convaincu. Une question : le JR Pass vaut vraiment le coup pour 2 semaines ?',                                          date_commentaire: '2025-04-22T16:00:00', approuve: true  },
      { id: 7,  article_id: 2,  pseudo: 'Sabine L.',    email: '',                  contenu: 'Conseil que j\'ajouterais : louez un vélo à Kyoto. La ville est parfaitement plate et c\'est la meilleure façon de découvrir les quartiers entre les temples sans les foules.',                         date_commentaire: '2025-04-23T11:00:00', approuve: true  },
      // Article 3 — Cuisine marocaine
      { id: 8,  article_id: 3,  pseudo: 'Amina B.',     email: 'amina@email.com',   contenu: 'Votre description de la b\'stilla m\'a transportée directement chez ma grand-mère à Fès. La part andalouse de notre cuisine est en effet trop souvent oubliée. Bravo pour la précision historique.',   date_commentaire: '2025-03-11T10:00:00', approuve: true  },
      { id: 9,  article_id: 3,  pseudo: 'Chef Youssef', email: '',                  contenu: 'En tant que chef, je confirme : la cuisson à la vapeur trois fois pour le couscous change tout. Une seule cuisson rend le grain pâteux. Patience et récompense !',                                   date_commentaire: '2025-03-12T14:00:00', approuve: true  },
      { id: 10, article_id: 3,  pseudo: 'French_Foodie', email: '',                 contenu: 'J\'ai découvert la b\'stilla il y a 3 ans à Marrakech et depuis je cherche une recette correcte. Cet article m\'a au moins expliqué pourquoi c\'est si complexe à reproduire chez soi !',             date_commentaire: '2025-03-14T08:00:00', approuve: false },
      // Article 4 — Mars
      { id: 11, article_id: 4,  pseudo: 'AstroFan',     email: '',                  contenu: 'Le passage sur Ingenuity est incroyable. 72 vols au lieu de 5 prévus ! C\'est comme si une mission entière avait surperformé à ce point. La NASA réussit vraiment bien ses rovers.',                  date_commentaire: '2025-05-02T09:00:00', approuve: true  },
      { id: 12, article_id: 4,  pseudo: 'DrCosmos',     email: 'cosmos@astro.fr',   contenu: 'Excellente synthèse. Je nuancerais sur SpaceX 2029 : les délais de Musk sont systématiquement optimistes d\'un facteur 2-3. Mais la direction est juste et l\'enthousiasme est nécessaire.',         date_commentaire: '2025-05-03T11:00:00', approuve: true  },
      // Article 5 — Jazz
      { id: 13, article_id: 5,  pseudo: 'JazzLover',    email: '',                  contenu: 'La phrase sur Armstrong est une porte d\'entrée parfaite. Et la section sur le bebop comme acte politique — c\'est une lecture que trop peu de gens font de cette musique. Magnifique article.',         date_commentaire: '2025-04-29T10:00:00', approuve: true  },
      { id: 14, article_id: 5,  pseudo: 'M. Renard',    email: '',                  contenu: 'Kamasi Washington méritait une mention encore plus large. Son album "The Epic" de 2015 est une œuvre totale qui a ramené le jazz dans les ears d\'une génération entière. Merci pour cet hommage.',   date_commentaire: '2025-04-30T16:00:00', approuve: true  },
      // Article 7 — Blockchain
      { id: 15, article_id: 7,  pseudo: 'CryptoSceptic', email: '',                 contenu: 'Enfin un article honnête qui ne vend ni le rêve crypto ni la diabolisation systématique. La distinction "quand une blockchain est justifiée" est exactement la question qu\'il faut poser.',           date_commentaire: '2025-03-11T15:00:00', approuve: true  },
      { id: 16, article_id: 7,  pseudo: 'Dev_Solidity',  email: '',                 contenu: 'Bon article, mais les smart contracts ont aussi leurs limites : ils sont immuables une fois déployés (un bug = impossible à corriger sans redéployer) et leur sécurité dépend de la qualité du code.',  date_commentaire: '2025-03-12T09:00:00', approuve: false },
      // Article 8 — Marrakech
      { id: 17, article_id: 8,  pseudo: 'Nadia_Travels', email: '',                 contenu: 'Le conseil sur les "guides" non officiels est essentiel et pourtant absent de la plupart des guides. Personnellement j\'ai utilisé l\'application Maps.me pour naviguer dans la médina.',              date_commentaire: '2025-02-15T09:00:00', approuve: true  },
      { id: 18, article_id: 8,  pseudo: 'Hassan F.',     email: '',                 contenu: 'Marrakchi de naissance, je suis toujours touché de voir ma ville décrite avec autant d\'amour et de respect. Venez aussi en hiver : les rues sont plus calmes et les couleurs de l\'Atlas enneigé...', date_commentaire: '2025-02-16T14:00:00', approuve: true  },
      // Article 9 — Sushi
      { id: 19, article_id: 9,  pseudo: 'Hana_K',        email: '',                 contenu: 'Japonaise d\'origine, je suis émue par la précision de cet article. La distinction vrai wasabi / raifort coloré — 99% des restaurants en France servent du raifort. Savoir cela change tout.',         date_commentaire: '2025-02-06T08:00:00', approuve: true  },
      { id: 20, article_id: 9,  pseudo: 'Sushi_Amateur',  email: '',                contenu: 'J\'ai eu la chance de faire un omakase à Tokyo l\'an dernier. Indescriptible. Merci à cet article de m\'aider à expliquer à mes amis pourquoi j\'ai payé 200€ pour 12 bouchées.',                    date_commentaire: '2025-02-07T12:00:00', approuve: true  },
      // Article 10 — CRISPR
      { id: 21, article_id: 10, pseudo: 'BioEthique',    email: '',                 contenu: 'L\'affaire He Jiankui reste un cas d\'école en bioéthique. Ce qui est techniquement possible n\'est pas forcément éthiquement acceptable. Le moratoire international sur l\'édition germinale est une bonne chose.',date_commentaire: '2025-03-23T09:00:00', approuve: true  },
      { id: 22, article_id: 10, pseudo: 'Med_Student',   email: '',                 contenu: 'Bonne introduction pour un non-spécialiste. Seule précision : Cas9 n\'est pas la seule nucléase utilisable — Cas12 et Cas13 ouvrent des applications encore plus larges (édition d\'ARN notamment).', date_commentaire: '2025-03-24T14:00:00', approuve: false }
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
    background:${type === 'success'
      ? 'linear-gradient(135deg,#27ae60,#1e8449)'
      : 'linear-gradient(135deg,#c0392b,#a93226)'};
    color:#fff; padding:.85rem 1.5rem; border-radius:3px;
    font-family:'Lato',sans-serif; font-size:.88rem; font-weight:700;
    letter-spacing:.5px;
    box-shadow:0 8px 30px rgba(9,23,40,.25);
    border-left:3px solid ${type === 'success' ? '#f0d88a' : '#f5c5c8'};
    animation:mbNotifIn .3s cubic-bezier(.22,1,.36,1);
    max-width:320px;
  `;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
