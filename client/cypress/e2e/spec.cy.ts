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
    cy.visit('http://localhost:5173');
    console.log(generateRandomString(10));
    cy.get('form').submit();
    cy.url().should('include', '/user-page');
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
    cy.get('#chat-list-item-1').click();
    cy.get('#text-message').type("Cypress sending a message on another user's chat.");
    cy.get('#text-message').type('{enter}')
    cy.get('#open-drawer-button').click();
    cy.get('#simulator-tab').click();
    cy.get('#close-drawer-button').click();
  })
})