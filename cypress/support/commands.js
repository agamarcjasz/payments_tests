Cypress.Commands.add('getByDataTestId', (selector) => {
    return cy.get(`[data-testid="${selector}"]`)
})