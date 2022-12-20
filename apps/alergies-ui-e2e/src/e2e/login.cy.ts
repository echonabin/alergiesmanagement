import { getLoginPage, getSignUpPage } from '../support/app.po';
import { password } from '../fixtures/auth.json';

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
  const email = `${Math.round(Math.random() * 2000)}@test.com`;
  it('should create user successfully', () => {
    getLoginPage().get('#Signup_button').click();
    cy.url().should('include', '/signup');
    getSignUpPage().get('#Email').type(email);
    getSignUpPage().get('#FirstName').type('John');
    getSignUpPage().get('#LastName').type('Doe');
    getSignUpPage().get('#Password').type(password);
    getSignUpPage().get('#ConfirmPassword').type(password);
    getSignUpPage().get('#Signup_button').click();
    getSignUpPage()
      .get('.Toastify__toast')
      .should('have.class', 'Toastify__toast--success');
  });

  it('should return and login user successfully', () => {
    getLoginPage().get('#Email').type(email);
    getLoginPage().get('#Password').type(password);
    getLoginPage().get('#Login_button').click();
    getLoginPage()
      .get('.Toastify__toast')
      .should('have.class', 'Toastify__toast--success');
    cy.url().should('include', '/dashboard');
  });
});
