beforeEach(() => {
  cy.visit('/');
});

describe('App.js', () => {
  it('should display header', () => {
    cy.get('.page-header').should('have.text', 'TrueBlocks Account Explorer');
  });

  it('should display menu panel', () => {
    cy.get('.page-body .menu-panel')
      .find('> .menu-item')
      .should('have.length.above', 1);
  });

  it('should display status panel', () => {
    cy.get('.side-panel.status-panel').should('exist');
  });

  it('should display the `inner page`', () => {
    cy.get('main .inner-panel')
      .should('exist')
      .find('.title')
      .invoke('text')
      .should('match', /dashboard/i);
  });

  it('should display help panel', () => {
    cy.get('.side-panel.help-panel').should('exist');
  });

  it('should display footer', () => {
    cy.get('.page-footer')
      .should('exist')
      .find('.footer-container')
      .invoke('text')
      .should('match', /TrueBlocks, LLC/);

    cy.get('.page-footer')
      .find('a img')
      .should('have.length', 4);
  });
});
