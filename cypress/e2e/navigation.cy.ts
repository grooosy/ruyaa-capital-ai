describe('navigation', () => {
  it('goes to settings page', () => {
    cy.visit('/');
    cy.contains('Settings').click();
    cy.url().should('include', '/settings');
  });
});
