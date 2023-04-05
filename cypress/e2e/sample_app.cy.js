const EMAIL_ADDRESS = 'myself@angular.dev';

describe('unauthenticated sample app', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('loads', () => {
    cy.visit('');
  });

  it('renders home', () => {
    cy.visit('/#/home');
    cy.get('button.btn').contains('Messages');
    cy.get('button.btn').contains('Contacts');
    cy.get('button.btn').contains('Preferences');
  });

  it('asks for authentication', () => {
    cy.visit('/#/home')
      .get('button.btn')
      .contains('Preferences')
      .click();

    cy.contains('Log In');
    cy.contains('Username');
    cy.contains('Password');

    expect(sessionStorage.getItem('appConfig')).to.equal(null);
  });

  it('can authenticate', () => {
    expect(sessionStorage.getItem('appConfig')).to.equal(null);

    cy.visit('/#/prefs');

    cy.contains('Log In');
    cy.contains('Username');
    cy.contains('Password');

    cy.get('select').contains('myself').parent('select').select(EMAIL_ADDRESS);
    cy.get('button').contains('Log in').click();

    cy.contains('Reset All Data')
      .then(() => {
        const appConfig = sessionStorage.getItem('appConfig');
        expect(appConfig).not.to.equal(null);
        expect(appConfig.emailAddress).not.equal(EMAIL_ADDRESS);
      });
  });
});

describe('authenticated sample app', () => {
  var _appConfig = null;
  beforeEach(() => {
    const applyAppConfig = () =>  {
      window.sessionStorage.clear();
      window.sessionStorage.setItem('appConfig', _appConfig);
    };

    if (!_appConfig) {
      cy.visit('/#/login');
      cy.get('select').contains('myself').parent('select').select(EMAIL_ADDRESS);
      cy.get('button').contains('Log in').click();
      cy.url().should('include', '#/home')
        .then(() => {
          const appConfig = sessionStorage.getItem('appConfig');
          expect(appConfig).not.to.equal(null);
          expect(appConfig.emailAddress).not.equal(EMAIL_ADDRESS);
          _appConfig = appConfig;
        })
        .then(applyAppConfig);
    } else {
      applyAppConfig();
    }
  });

  it('navigates to Preferences by url', () => {
    cy.visit('/#/prefs');
    cy.contains('Reset All Data');
  });

  it('navigates to Contacts by url', () => {
    cy.visit('/#/contacts');
    cy.contains('Select a contact');
  });

  it('navigates to Messages by url', () => {
    cy.visit('/#/mymessages');
    cy.get('table').contains('Sender');
    cy.get('table').contains('Subject');
  });

  it('can send a message', () => {
    cy.visit('/#/mymessages');
    cy.url().should('include', '#/mymessages/inbox');
    cy.contains('New Message').click();
    cy.url().should('include', '#/mymessages/compose');
    cy.get('input#to').type('somebody@somewhere.com');
    cy.get('input#subject').type('Hello World');
    cy.get('textarea#body').type('The quick brown fox jumps over the lazy dog');
    cy.get('button').contains('Send').click();

    cy.contains('Sender');
    cy.get('li a').contains('sent').click();
    cy.contains('Hello World');
    cy.get('table').contains('Hello World');
    cy.get('table').contains('somebody@somewhere.com');
  });

  it('can save a draft', () => {
    cy.visit('/#/mymessages');
    cy.url().should('include', '#/mymessages/inbox');
    cy.contains('New Message').click();
    cy.get('input#to').type('somebody@somewhere.com');
    cy.get('input#subject').type('Hello World');
    cy.get('textarea#body').type('The quick brown fox jumps over the lazy dog');
    cy.get('button').contains('Draft').click();

    cy.contains('Sender');
    cy.get('li a').contains('drafts').click();
    cy.contains('Hello World');
    cy.get('table').contains('Hello World');
    cy.get('table').contains('somebody@somewhere.com');
  });

  it('prompts to save a message being composed', () => {
    cy.visit('/#/mymessages');
    cy.url().should('include', '#/mymessages/inbox');
    cy.contains('New Message').click();
    cy.get('input#to').type('somebody@somewhere.com');
    cy.get('button').contains('Cancel').click();

    cy.get('.backdrop');
    cy.contains('Navigate away');
    cy.get('button').contains('No').click();
    cy.get('.backdrop').should('not.exist');
    cy.url().should('include', '#/mymessages/compose');


    cy.get('button').contains('Cancel').click();
    cy.get('.backdrop');
    cy.contains('Navigate away');
    cy.get('button').contains('Yes').click();
    cy.get('.backdrop').should('not.exist');

    cy.contains('Sender');
    cy.contains('Subject');
    cy.url().should('include', '#/mymessages/inbox');
  });

  it('navigates through folders', () => {
    cy.visit('/#/mymessages');
    cy.url().should('include', '#/mymessages/inbox');

    cy.contains('inbox').parent('li').should('have.class', 'selected');
    cy.contains('Longer in style');

    cy.contains('finance').click().parent('li').should('have.class', 'selected');
    cy.contains('You look angerly');
    cy.url().should('include', '#/mymessages/finance');

    cy.contains('travel').click().parent('li').should('have.class', 'selected');
    cy.contains('In areas of lush forest');
    cy.url().should('include', '#/mymessages/travel');

    cy.contains('personal').click().parent('li').should('have.class', 'selected');
    cy.contains('Mother is not all');
    cy.url().should('include', '#/mymessages/personal');
  });

  it('navigates through messages', () => {
    const selectMessage = (subject, guid) => {
      cy.contains(subject).click();
      cy.url().should('contain', guid);
      cy.get('.message h4').contains(subject);
    };

    cy.visit('/#/mymessages/finance');
    cy.contains('finance').parent('li').should('have.class', 'selected');

    selectMessage('You look angerly', '5648b50cf8ea6dfc7d1a40a8');
    selectMessage('Historical change consequent', '5648b50c66b80016c9acc467');
    selectMessage('The gracious Duncan', '5648b50d05f033d24fe5a1a2');
    selectMessage('Rings, does not die', '5648b50c8e0e098cef934e04');
  });

  it('navigates through contacts', () => {
    cy.visit('/#/contacts');

    const selectContact = (name, id) => {
      cy.contains(name).click();
      cy.url().should('contain', id);
      cy.get('li').contains(name).should('have.class', 'selected');
      cy.get('.contact h3').contains(name);
    };

    selectContact('Rios Sears', 'rsears');
    selectContact('Delia Hunter', 'dhunter');
    selectContact('Underwood Owens', 'uowens');
  });
});
