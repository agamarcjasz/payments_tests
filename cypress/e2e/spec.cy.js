beforeEach(() => {
  cy.visit('https://autotest-recruitment.qa.shortlist.co/v/test-vendor-1/i/8z/762c64abf48540b686b12fa10048496f/')
  cy.get('[data-testid="SidebarItem-payments"]').click()
  cy.get('[data-testid="SideNavigation_SubSectionItem_unpaid-work"]').click()
})

describe('adding expense', () => {
  it('should add new expense and check if it was added', () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const amount = "1,000.00"
    const fileName = "dummy.pdf"
    const expenseName = `Invoice_${randomNumber}`
    const note = "Invoice for the app testing service"

    cy.contains("Add new expense").click()
    cy.contains(' Test Vendor 1 ').should('be.visible')
    cy.get('r-input-file').within((el) => {
      cy.get('[role="presentation"]').should('be.visible')
    })
    cy.get('[placeholder="Amount"]').type(amount)
    cy.get('r-input-file').within((el) => {
      cy.get('[role="presentation"]').click()
    })
    cy.fixture(`${fileName}`, { encoding: null }).as('expenseFile')
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
    cy.get('[data-testid="PaymentDetailsView"]').within((el) => {
      cy.contains(expenseName).should('be.visible')
      cy.contains(amount).should('be.visible')
      cy.get('payment-download-link[payment]').should('be.visible')
      cy.contains(note).should('be.visible')
    })
  })
})