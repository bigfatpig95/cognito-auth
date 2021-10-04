describe('Authenticator:', function() {
    // Step 1: setup the application state
    beforeEach(function() {
      cy.visit('/');
      cy.get('.navbar-nav').contains('Login').click()
     // cy.get()
    });
    
    describe('Sign In:', () => {
      it('allows a user to signin', () => {
        // Step 2: Take an action (Sign in)
        cy.get('a').contains('Forgot password').click()
        cy.get('label.form-label').contains('Email')
        cy.get('Button').contains('Send Confirmation')
        cy.get('.navbar-nav').contains('Login').click()
        cy.get('#email.form-control').type("test@hotmail.com");
        cy.get('#password.form-control').type("P@ssw0rd");
        
        cy.get('Button').contains('Login').click();
        
        // Step 3: Make an assertion (Check for sign-out text)
          cy.get('.navbar').contains('Logout').click();

          //cy.visit('/');
        cy.get('.navbar-nav').contains('Signup').click()
        cy.get('#email.form-control').type("qwert@tyuio.com");
        cy.get('#password.form-control').type("P@ssw0rd");
        cy.get('#confirmPassword.form-control').type("P@ssw0rd");
        cy.get('Button').contains('Signup')


      });
    });

    //beforeEach(function() {
        
       // cy.get()
  //    });
  
  });
  export const selectors = {
    // Auth component classes
    usernameInput: '[data-test="username-input"]',
    signInPasswordInput: '[data-test="sign-in-password-input"]',
    signInSignInButton: '[data-test="sign-in-sign-in-button"]',
    signOutButton: '[data-test="sign-out-button"]'
  }