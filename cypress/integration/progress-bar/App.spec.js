/// <reference types="Cypress" />

context('Initial Page', () => {
    beforeEach(() => {

    })
    describe('Loading App', () => {
        it('Checks if server running properly', () => {
            cy.visit('/');
            cy.wait(2000);
        });

        it('Renders App Page', () => {
            cy.get('.App');
        })

        it('Renders ProgressBar component', () => {
            cy.get('.progress-bar-component');
        })
    });
});
