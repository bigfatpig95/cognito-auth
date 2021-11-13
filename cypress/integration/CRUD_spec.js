
describe('CRUD:', function() {
    // Step 1: setup the application state
    beforeEach(function() {
      cy.visit('/');
      cy.get('.navbar-nav').contains('Login').click()
      cy.get('#email.form-control').type("test@hotmail.com");
      cy.get('#password.form-control').type("P@ssw0rd");
        
      cy.get('Button').contains('Login').click();
      cy.wait(1000)
     // cy.get()
    });


    describe('create:', () => {
        it('allows a user to list a new item', () => {
          // Step 2: Take an action (Sign in)
          cy.get('.text-nowrap').contains('List a new item').click()
          cy.get('#ItemName').type('test item')
          cy.get('#Description').type('test description')
          cy.get('#formGridState').select('Books')
          cy.get('#price').type(50)
          //const fixtureFile = '../fixtures/ganger.JPG';
          const fixtureFile = 'ganger.JPG';
          cy.get("#file").attachFile(fixtureFile)
          cy.get('.mt-3 > .LoaderButton').click()
          cy.wait(1000)
        })
    });
    

    describe ('edit:', () => {
        it ('allows a user to edit his own item', () => {
            cy.wait(1000)
            cy.get('a').contains('test item').click()
            cy.get('#ItemName').clear().type('test item edit')
            cy.get('form > .btn-primary').click()
            cy.wait(1000)
            cy.get('a').contains('test item edit')


        })
    });

    describe ('check correct category and cost filter', () => {
        it ('check correct category / filter', () => {
            cy.wait(1000)
            cy.get('[href="/Books"]').click()
            cy.wait(1000)
            cy.get('a').contains('test item edit')
            
            cy.get('.dropdown-toggle').click()
            cy.get('.dropdown-menu > :nth-child(1)').click()
            cy.wait(1000)
            cy.get('a').contains('test item edit')
        })
    });


    describe ('delete:', () => {
        it ('allows a user to delete his own item', () => {
            cy.wait(1000)
            cy.get('a').contains('test item edit').click()
            cy.get('#ItemName').clear().type('test item edit')
            cy.get('.btn-danger').click()
            cy.wait(1000)
            cy.get('a').contains('test item edit').should('not.exist')

        })
    });


    


     
      });
