import {
  getLayouts,
  getListAllergyPage,
  getSingleAllergyPage,
  getUpdateAllergyPage,
  createAllergy,
  loginUser,
  getAddAllergyPage,
} from '../support/app.po';

describe('List Allergy Page', () => {
  beforeEach(() => {
    cy.visit('/');
    loginUser();
  });

  it('should login user', () => {
    cy.url().should('include', '/dashboard');
  });

  it('should go to list allergy page successfully', () => {
    getLayouts().get('#ListAllergies_1').click();
    cy.url().should('include', '/allergy');
  });

  it('should render the allergy list page successfully', () => {
    getLayouts().get('#ListAllergies_1').click();
    getListAllergyPage()
      .get('#render_table')
      .should('have.class', 'w-full bg-slate-100');
  });

  it('should go to single allergy page and render it', () => {
    getLayouts().get('#ListAllergies_1').click();
    getListAllergyPage().get(`#table_data_1`).click();
    getSingleAllergyPage()
      .get('#allergy_title')
      .should('have.class', 'text-3xl font-semibold');
  });

  it('should go to edit page and render it', () => {
    createAllergy().then((res) => {
      const id = res.body.response[0].id;
      getLayouts().get('#ListAllergies_1').click();
      getListAllergyPage().get(`#Edit_${id}`).click();
      getUpdateAllergyPage()
        .get('#update_allergy_form')
        .should('have.class', 'pt-8');
    });
  });

  it('should edit one field and update it', () => {
    getLayouts().get('#ListAllergies_1').click();
    createAllergy().then((res) => {
      const id = res.body.response[0].id;
      getListAllergyPage().get(`#Edit_${id}`).click();
      getUpdateAllergyPage().get('#Severity').clear();
      getUpdateAllergyPage().get('#Severity').type('Normal');
      getUpdateAllergyPage().get('#Update_button').click();
      getUpdateAllergyPage()
        .get('.Toastify__toast')
        .should('have.class', 'Toastify__toast--success');
    });
  });

  it('should delete one allergy', () => {
    createAllergy().then((res) => {
      const id = res.body.response[0].id;
      getLayouts().get('#ListAllergies_1').click();
      getListAllergyPage().get(`#Delete_${id}`).click();
      getListAllergyPage().get('.swal2-confirm').click();
      getListAllergyPage().get('.swal2-confirm').click();
    });
  });

  it('should add an allergy successfully', () => {
    getLayouts().get('#CreateAllergy_2').click();
    getAddAllergyPage()
      .get('#add_allergy_form')
      .should('have.class', 'space-y-6');
    getAddAllergyPage()
      .get('#Name')
      .type(`Eye Allergy ${Math.round(Math.random() * 1000)}`);
    getAddAllergyPage().get('#Symptoms').type('Eye ich, Red eye');
    getAddAllergyPage().get('#Severity').type('Normal');
    getAddAllergyPage().get('#Treatments').type('Eye Drops');
    getAddAllergyPage().get('#Notes').type('Some notes here....');
    getAddAllergyPage().get('#Submit_button').click();
    getAddAllergyPage()
      .get('.Toastify__toast')
      .should('have.class', 'Toastify__toast--success');
  });
});
