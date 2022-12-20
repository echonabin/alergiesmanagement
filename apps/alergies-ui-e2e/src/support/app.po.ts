import { email, password } from '../fixtures/auth.json';
export const getLoginPage = () => cy.get('#login_page');
export const getSignUpPage = () => cy.get('#signup_page');
export const getLayouts = () => cy.get('#layout_page');
export const getListAllergyPage = () => cy.get('#list_allergy');
export const getSingleAllergyPage = () => cy.get('#single_allergy_page');
export const getUpdateAllergyPage = () => cy.get('#update_allergy_page');

export const createAllergy = () =>
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/api/allergy',
    body: {
      name: `Testing from cypress ${Math.round(Math.random() * 2000)}`,
      symptoms: 'testing',
      treatments: 'testing injection',
      notes: 'Something as a notes',
      severity: 'Urgent',
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

export const loginUser = () => {
  getLoginPage().get('#Email').type(email);
  getLoginPage().get('#Password').type(password);
  getLoginPage().get('#Login_button').click();
  getLoginPage()
    .get('.Toastify__toast')
    .should('have.class', 'Toastify__toast--success');
};
