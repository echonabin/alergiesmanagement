import { getLayouts, loginUser } from '../support/app.po';

describe('Navigation and routes', () => {
  beforeEach(() => {
    cy.visit('/');
    loginUser();
  });

  it('should go to dashboard page successfully', () => {
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
