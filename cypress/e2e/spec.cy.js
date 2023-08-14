import { generateRandomNumber, nextMonth15th } from "../support/functions"

beforeEach(() => {
  cy.visit(Cypress.env('test_url'))
  cy.getByDataTestId('SidebarItem-payments').click()
  cy.getByDataTestId('SideNavigation_SubSectionItem_unpaid-work').click()
})

describe('adding expense', () => {
  it('should add new expense and check if it was added', () => {
    
    const amount = "1,000.00"
    const expenseName = `Invoice_${generateRandomNumber()}`
    const note = "Invoice for the app testing service"
    const dueDate = nextMonth15th()

    cy.contains("Add new expense").click()
    cy.contains(' Test Vendor 1 ').should('be.visible')
    cy.get('r-input-file').within((el) => {
      cy.get('[role="presentation"]').should('be.visible')
    })
    cy.get('[placeholder="Amount"]').type(amount)
    cy.get('r-input-file').within((el) => {
      cy.get('[role="presentation"]').click()
    })
    cy.fixture('dummy.pdf', { encoding: null }).as('expenseFile')
    cy.get('input[type="file"]').selectFile('@expenseFile', {force: true})
    cy.get('[data-e2e="upload"]').click()
    cy.get('[id="invoiceNumber"]').type(expenseName)
    cy.get('[id="invoiceNote"]').type(note)
    cy.get('[protractor-id="proposal-due"]').click()
    cy.get('div[class="bootstrap-datetimepicker-widget dropdown-menu picker-open top"]').within((el) => {
      cy.get('div[class="datepicker-days"]').within((el2) => {
        cy.get('th[class="next"]').click()
        cy.contains('15').click()
      })
    })
    cy.contains('Send').click()

    cy.contains('Your expense has been added').should('be.visible')
    cy.contains(expenseName).should('be.visible')

    cy.contains(expenseName).click()
    cy.getByDataTestId('PaymentDetailsView').within((el) => {
      cy.contains(expenseName).should('be.visible')
      cy.contains(amount).should('be.visible')
      cy.get('payment-download-link[payment]').should('be.visible')
      cy.contains(note).should('be.visible')
      cy.contains(dueDate).should('be.visible')
    })
  })
})