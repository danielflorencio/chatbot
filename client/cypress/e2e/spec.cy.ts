// https://www.slingacademy.com/article/ways-to-generate-random-strings-in-javascript/
const generateRandomString = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

describe('Chatbot tests', () => {
  it('Should test the whole application.', () => {
    cy.visit('http://localhost:5173/sign-up');
    // console.log(generateRandomString(10).concat('@gmail.com'));
    const generatedEmail:string = generateRandomString(10).concat('@gmail.com')
    const generatedPass:string = generateRandomString(10).concat('@pass')
    const generatedFirstName:string = generateRandomString(6).concat('@firstName')
    const generatedLastName: string = generateRandomString(6).concat('@lastName')
    cy.get('#first-name-input').type(generatedFirstName);
    cy.get('#last-name-input').type(generatedLastName);
    cy.get('#email-input').type(generatedEmail);
    cy.get('#password-input').type(generatedPass);
    cy.get('form').submit();
    cy.url().should('equal', 'http://localhost:5173/');
    cy.get('#email').clear();
    cy.get('#password').clear();
    cy.get('#email').type(generatedEmail);
    cy.get('#password').type(generatedPass);
    cy.get('form').submit();
    cy.url().should('include', '/user-page');
    cy.get('#create-chat-button').click();
    cy.get('#new-chat-number-field').type('New chat test')
    cy.get('#new-chat-number-form').submit();
    cy.get('#chat-list-item-0').click();
    cy.get('#text-message').type('Cypress automated test message.');
    cy.get('#text-message').type('{enter}')
    cy.get('#open-drawer-button').click();
    cy.get('#simulator-tab').click();
    cy.get('#close-drawer-button').click();
    cy.get('#customer-simulator-input-field').type('Cypress customer automated message.')
    cy.get('#send-customer-message-icon').click();
    cy.get('#open-drawer-button').click();
    cy.get('#chat-tab').click();
    cy.get('#close-drawer-button').click();
    cy.get('#chat-list-item-0').click();
    cy.get('#text-message').type("Cypress sending a message on another user's chat.");
    cy.get('#text-message').type('{enter}')
    cy.get('#open-drawer-button').click();
    cy.get('#simulator-tab').click();
    cy.get('#close-drawer-button').click();
  })
})

export {};