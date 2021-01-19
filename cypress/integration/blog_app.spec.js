describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user1 = {
      name: 'test name',
      username: 'test',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)

    const user2 = {
      name: 'test2 name',
      username: 'test2',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('1234')
      cy.contains('login').click()

      cy.contains('Blogs')
    })

    it('fails with wrong credentials and notification is red', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.should('not.contain', 'Blogs')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('1234')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title')
        .type('test title')
      cy.get('#author')
        .type('test author')
      cy.get('#url')
        .type('test url')
      cy.get('button[type="submit"]')
        .click()

      cy.get('li')
        .should('contain', 'test title by test author')
        .and('contain', 'view')
    })

    describe('and a Blog exists', function() {
      beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('#title')
          .type('test title')
        cy.get('#author')
          .type('test author')
        cy.get('#url')
          .type('test url')
        cy.get('button[type="submit"]')
          .click()
      })

      it('User can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('1')
        cy.get('.notification')
          .should('contain', 'Updated Blog')
      })

      it('User who created it can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.notification')
          .should('contain', 'Deleted Blog')
      })

      it('A different User cant delete it', function() {
        cy.contains('logout').click()

        cy.get('#username').type('test2')
        cy.get('#password').type('1234')
        cy.contains('login').click()

        cy.contains('view').click()
        
        cy.get('li')
          .should('not.contain', 'remove')
      })      
    })

    describe.only('And 2 Blogs exist', function() {
      beforeEach(function() {
        cy.contains('New Blog').click()
        cy.get('#title')
          .type('test title')
        cy.get('#author')
          .type('test author')
        cy.get('#url')
          .type('test url')
        cy.get('button[type="submit"]')
          .click()

        cy.contains('New Blog').click()
        cy.get('#title')
          .type('test2 title')
        cy.get('#author')
          .type('test2 author')
        cy.get('#url')
          .type('test2 url')
        cy.get('button[type="submit"]')
          .click()
      })

      it.only('The Blogs are sorted by the amount of likes (asc)', function() {
        cy.get('li:nth-child(2)')
          .should('contain', 'test2 title by test2 author')
          .contains('view')
          .click()
        
        cy.contains('like')
          .click()
          .click()

        cy.get('li:nth-child(2)')
          .should('not.contain', 'test2 title by test2 author')
        
        cy.get('li:nth-child(2)')
          .should('contain', 'test title by test author')
      })
    })
  })
})
