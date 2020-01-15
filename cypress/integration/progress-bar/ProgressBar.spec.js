/// <reference types="Cypress" />

context('Progress Bar', () => {
    beforeEach(() => {
        
    });
    describe('ProgressBar Component', () => {
        it('Checks server if running properly', () => {
            cy.visit('/');
        });

        it('Renders ProgressBar component with complete layout', () => {
            cy.get('.progress-bar-component').find('.progress');
            cy.get('.progress-bar-component').find('select');
            cy.get('.progress-bar-component').find('.bars');
        });

        it('Checks API Data', () => {
            cy.request('https://pb-api.herokuapp.com/bars')
                .should((response) => {
                    expect(response.status).to.eq(200)
                    // expect(response.body).to.have.length(500)
                    // expect(response).to.have.property('headers')
                    // expect(response).to.have.property('duration')
                    expect(response.body.limit).to.greaterThan(0);
                    expect(response.body.buttons).length.to.greaterThan(0);
                    expect(response.body.bars.length).to.greaterThan(0);
                });
        });

        it('Renders API Data in UI', () => {
            cy.get('.progress-bar-component').find('.bars').should(data => {
                expect(data[0].children.length).to.greaterThan(0);
            });
            cy.get('.progress-bar-component').find('select').should(data => {
                expect(data[0].children.length).to.greaterThan(0);
            });
            cy.get('.progress-bar-component').find('.buttons').should(data => {
                expect(data[0].children.length).to.greaterThan(0);
            });
        });

        it('Checks for active or selected progress bar', () => {
            cy.get('.progress-bar-component .bars').find('.bg-warning');
        });

        it('Check selectbox and the selected progress bar are sync', () => {
            cy.get('.progress-bar-component select').then(d => {
                cy.get('.progress-bar-component .progress').eq(d[0].value).find('.progress-bar').should('have.class', 'bg-warning');
            });

            cy.get('.progress-bar-component select').select('1').then(d => {
                cy.get('.progress-bar-component .progress').eq(d[0].value).find('.progress-bar').should('have.class', 'bg-warning');
            });
        });

        it('Check the buttons if it works', () => {
            cy.get('.progress-bar-component .buttons .btn').then(d => {
                Array.from(d).map(btn => {
                    let btnValue = parseInt(btn.dataset.value, 10);
                    Array.from({ length: 5 }).map(() => {
                        cy.get('.bg-warning').then(first => {
                            let firstValue = parseInt(first[0].dataset.value, 10);
                            cy.get(btn).click();
                            cy.wait(1000);
                            cy.get('.bg-warning').then(second => {
                                let secondValue = parseInt(second[0].dataset.value, 10);
                                let limit = parseInt(second[0].dataset.limit, 10);
                                if (secondValue <= 0) expect(secondValue).to.equal(0);
                                else if (secondValue >= limit) expect(secondValue).to.equal(limit);
                                else expect(secondValue).to.equal(firstValue + btnValue);
                            });
                        });
                    });
                });
            })
        });
    });
});
