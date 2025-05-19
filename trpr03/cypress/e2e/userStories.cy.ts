describe('Récits utilisateur', () => {
  // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
  const user = {
    email: 'mon@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee'
  }

  const dev = {
    email: 'dev@dev.com',
    password: 'test',
    name: 'Dev leDev',
    isDev: true
  }

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

    // On ajoute l'utilisateur à la BD en utilisant la commande POST /register de notre API REST (serveur backend).
    // TODO : utiliser une variable d'environnement pour l'URL du serveur backend.
    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: user.email,
      password: user.password,
      name: user.name
    })
    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: dev.email,
      password: dev.password,
      name: dev.name
    })
  })

  // Les tests sont écrits sous forme de récits utilisateur. Voir les notes de cours à ce sujet.
  it("je peux accéder à la page d'accueil", () => {
    // L'instruction `cy` permet d'exécuter des commandes de Cypress.
    // Ici, on visite la page d'accueil.
    cy.visit('/')

    // On vérifie que la page contient, dans une balise H1, le texte "Accueil"
    cy.contains('.welcome_text', /Bienvenue!/i)
  })

  it('je peux accéder à la page à propos', () => {
    cy.visit('/about')

    cy.contains('h1', /à propos/i)
  })

  it('je peux me connecter - version 1 ', () => {
    cy.visit('/login')

    // On utilise .get pour sélectionner dans le DOM un élément input dont l'attribut name est email-input. Ensuite, .type est utilisé pour saisir du texte dans cet élément.
    cy.get('input[name=email-input]').type(user.email)
    cy.get('input[name=password-input]').type(user.password)
    // On utilise .get pour sélectionner dans le DOM un élément bonton dont l'attribut type est submit). Ensuite, .click est utilisé pour cliquer sur cet élément.
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
  })

  it('je peux me connecter - version 2', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login(user.email, user.password)
  })

  it('je peux me déconnecter', () => {
    cy.login(user.email, user.password)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('je peux voir mon profil', () => {
    cy.login(user.email, user.password)

    cy.contains(user.name)
    cy.contains(user.email)
  })

  it('je peux créer un bug en tant que testeur', () => {
    cy.login(user.email, user.password)

    cy.visit('/testerBugList')

    // Remplir le formulaire de création du bug chat GPT
    cy.get('input#title').type('Bug Cypress Test')
    cy.get('input#description').type('Description du bug créé par Cypress')
    cy.get('input#productionStep').type('Étape de test')
    cy.get('input#platform').type('Web')
    cy.get('select#priority').select('Haute')
    cy.get('select#type').select('Crash')

    cy.get('button[type=submit]').click()
  })

  it('je peux créer un bug en tant que testeur et ensuite je peut lappercevoir dans la liste de bugs', () => {
    cy.login(user.email, user.password)

    cy.visit('/testerBugList')

    // Remplir le formulaire de création du bug chat GPT
    cy.get('input#title').type('Bug Cypress Test')
    cy.get('input#description').type('Description du bug créé par Cypress')
    cy.get('input#productionStep').type('Étape de test')
    cy.get('input#platform').type('Web')
    cy.get('select#priority').select('Haute')
    cy.get('select#type').select('Crash')

    cy.get('button[type=submit]').click()

    cy.wait(2000) //chat GPT attendre 5 secondes

    cy.window().then((win) => {
      //chat GPT scroll vers le haut
      win.scrollTo(0, 0)
    })

    cy.contains('h4', 'Bug Cypress Test').should('be.visible')
    cy.contains('p', 'Description du bug créé par Cypress').should('be.visible')
    cy.contains('p', 'Platform: Web').should('be.visible')
    cy.contains('p', 'Type: Crash').should('be.visible')
  })

  it('je peux changer la priorité d’un bug et la sauvegarder', () => {
    cy.login(user.email, user.password)

    cy.visit('/testerBugList')

    // Création du bug via le formulaire (comme avant)
    cy.get('input#title').type('Bug Cypress Test')
    cy.get('input#description').type('Description du bug créé par Cypress')
    cy.get('input#productionStep').type('Étape de test')
    cy.get('input#platform').type('Web')
    cy.get('select#priority').select('Haute')
    cy.get('select#type').select('Crash')
    cy.get('button[type=submit]').click()

    cy.wait(2000)

    cy.window().then((win) => win.scrollTo(0, 0))

    cy.contains('h4', 'Bug Cypress Test').parents('.card').as('bugCard') //chat GPT

    cy.get('@bugCard').contains('button', 'Changer la priorité').click()

    cy.get('@bugCard').find('select#new-priority').should('be.visible').select('Moyenne')

    cy.get('@bugCard').contains('button', 'Sauvegarder').click()

    cy.get('@bugCard').contains('Priorité: Moyenne').should('be.visible')
  })

  it('je peux créer un bug, me déconnecter et me reconnecter et il sera toujours là', () => {
    cy.login(user.email, user.password)

    cy.visit('/testerBugList')

    // Création du bug via le formulaire (comme avant)
    cy.get('input#title').type('Bug Cypress Test')
    cy.get('input#description').type('Description du bug créé par Cypress')
    cy.get('input#productionStep').type('Étape de test')
    cy.get('input#platform').type('Web')
    cy.get('select#priority').select('Haute')
    cy.get('select#type').select('Crash')
    cy.get('button[type=submit]').click()

    cy.wait(1000)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)

    cy.login(user.email, user.password)

    cy.visit('/testerBugList')

    cy.window().then((win) => win.scrollTo(0, 0))

    cy.contains('h4', 'Bug Cypress Test').should('be.visible')
    cy.contains('p', 'Description du bug créé par Cypress').should('be.visible')
    cy.contains('p', 'Platform: Web').should('be.visible')
    cy.contains('p', 'Type: Crash').should('be.visible')
  })
  it('je peux me changer mon mot de passe', () => {
    cy.login(user.email, user.password)

    cy.visit('/profile')

    const newPass = 'allo'

    cy.get('input#password-input').clear().type(newPass)

    cy.get('input#password-validation-input').clear().type(newPass)

    cy.get('button[type=submit]').click()

    cy.wait(2000)

    cy.contains('Mot de passe changé avec succès!').should('be.visible')
  })
})
