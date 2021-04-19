describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Tester',
      username: 'tester',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log into the Blog-list app')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-test-id="login-form"]').as('theForm')
      cy.get('@theForm').get('[name="Username"]').type('tester')
      cy.get('@theForm').get('[name="Password"]').type('12345')
      cy.get('@theForm').get('button[type=submit]').click()

      cy.contains('Cypress Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-test-id="login-form"]').as('theForm')
      cy.get('@theForm').get('[name="Username"]').type('jackTheRipper')
      cy.get('@theForm').get('[name="Password"]').type('999999999')
      cy.get('@theForm').get('button[type=submit]').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})
