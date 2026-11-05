// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// ===== Custom commands used by the showcase specs (SauceDemo) =====

// cy.login('standard_user', 'secret_sauce')
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.get('#user-name').clear().type(username)
  cy.get('#password').clear().type(password)
  cy.get('#login-button').click()
})

// cy.logout() - open the burger menu and click Logout
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click()
  cy.get('#logout_sidebar_link').should('be.visible').click()
})
