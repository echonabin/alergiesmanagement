import { getLayouts, getLoginPage } from '../support/app.po';
import { email, password } from '../fixtures/auth.json';

describe('Navigation and routes', () => {
  beforeEach(() => cy.visit('/'));

  it('should login user', () => {
    getLoginPage().get('#Email').type(email);
    getLoginPage().get('#Password').type(password);
    getLoginPage().get('#Login_button').click();
    getLoginPage()
      .get('.Toastify__toast')
      .should('have.class', 'Toastify__toast--success');
    cy.url().should('include', '/dashboard');
  });

  it('should go to dashboard page successfully', () => {
    getLayouts().get('#Dashboard_0').click();
    cy.url().should('include', '/dashboard');
  });

  it('should go to list allergy page successfully', () => {
    getLayouts().get('#ListAllergies_1').click();
    cy.url().should('include', '/allergy');
  });

  it('should go to create allergy page successfully', () => {
    getLayouts().get('#CreateAllergy_2').click();
    cy.url().should('include', '/allergy/add');
  });
});
