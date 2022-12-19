import { getLoginPage, getSignUpPage } from '../support/app.po';

describe('Login portion and login screen', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect to /login and render login page', () => {
    cy.url().should('include', '/login');
    getLoginPage().contains('Login');
  });

  it('should fail the login and show the alert', () => {
    getLoginPage().get('#Email').type('echonabin@gmail.com');
    getLoginPage().get('#Password').type('somethingWrong');
    getLoginPage().get('#Login_button').click();
    getLoginPage()
      .get('.Toastify__toast')
      .should('have.class', 'Toastify__toast--error');
  });

  const email = `${Math.random() * 200}user@gmail.com`;

  it('should create user successfully', () => {
    getLoginPage().get('#Signup_button').click();
    cy.url().should('include', '/signup');
    getSignUpPage().get('#Email').type(email);
    getSignUpPage().get('#FirstName').type('John');
    getSignUpPage().get('#LastName').type('Doe');
    getSignUpPage().get('#Password').type('@@Testing11');
    getSignUpPage().get('#ConfirmPassword').type('@@Testing11');
    getSignUpPage().get('#Signup_button').click();
    getSignUpPage()
      .get('.Toastify__toast')
      .should('have.class', 'Toastify__toast--success');
  });

  it('should return and login user successfully', () => {
    getLoginPage().get('#Email').type(email);
    getLoginPage().get('#Password').type('@@Testing11');
    getLoginPage().get('#Login_button').click();
    getLoginPage()
      .get('.Toastify__toast')
      .should('have.class', 'Toastify__toast--success');
    cy.url().should('include', '/dashboard');
  });
});
