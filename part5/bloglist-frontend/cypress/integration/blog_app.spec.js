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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: '12345' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('a blog created by cypress')
      cy.get('input[name="Author"]').type('Cypress author')
      cy.get('input[name="URL"]').type('http://cypress.rules.com')
      cy.get('button[type=submit]').click()

      cy.get('.info')
        .should(
          'contain',
          'A new blog "a blog created by cypress" by Cypress author added'
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('a blog created by cypress Cypress author')
    })

    describe('and several blog exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'cypress author',
          url: 'http://cypress.rules.com',
          likes: 1
        })

        cy.createBlog({
          title: 'second blog',
          author: 'another author',
          url: 'http://blog.jander.com',
          likes: 0
        })
      })

      it.only('one of those can be liked', function () {
        cy.contains('second blog').parent().as('blog')
        cy.get('@blog').find('button').click()
        cy.get('@blog').find('[data-test-id="like-button"]').click()
      })
    })
  })
})
