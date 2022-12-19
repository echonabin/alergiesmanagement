import { getLogin } from '../support/app.po';

describe('alergies-ui', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect to /login and render login page', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getLogin().contains('Login');
  });
});
