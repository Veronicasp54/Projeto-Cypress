/// <reference types="cypress"/> 

context('Dev Finances Agilizei', () => {

    before(()=>{
        cy.get('#data-table tbody tr').should('have.length', 0)
        cy.visit('https://devfinance-agilizei.netlify.app')
    });

    it('Cadastrar entrada', () => {

        cy.get('#transaction .button').click();
        cy.get('#description').type('Salário')
        cy.get('[name=amount]').type(1100)
        cy.get('#date').type('2021-03-17')
        cy.get('button').contains('Salvar').click();


        cy.get('#data-table tbody tr').should('have.length', 1)

        // cy.get('td .description').should('have.class', 'Salário')
        // contains('Salário adiantado')
        // cy.get('.income').should('have.value', 1100)
        // cy.get('.date').should('have.value', '2021-03-17')
    });

    it('Cadastrar saída', () => {

        cy.get('#transaction .button').click();
        cy.get('#description').type('Mercado')
        cy.get('[name=amount]').type(-100)
        cy.get('#date').type('2021-03-17')
        cy.get('button').contains('Salvar').click();


        cy.get('#data-table tbody tr').should('have.length', 2)
        
    });

    it('Limpar histórico', () => {
        const entrada = 'Salário'
        const saida ='Mercado'

        cy.get('td.description')
            .contains(entrada)
            .parent() //pai
            .find('img[onclick*=remove]') //busca
            .click()

            cy.get('td.description')
            .contains(saida)
            .siblings() //irmãos
            .children('img[onclick*=remove]') //filtrar filho
            .click()

    });

    // after(()=>{
    //     cy.get('#data-table tbody tr').should('have.length', 0)
    // });

    it.only('Valida saldo com diversas transações', () => {
        
        cy.get('#transaction .button').click();
        cy.get('#description').type('Salário')
        cy.get('[name=amount]').type(1100)
        cy.get('#date').type('2021-03-17')
        cy.get('button').contains('Salvar').click();


        cy.get('#transaction .button').click();
        cy.get('#description').type('Mercado')
        cy.get('[name=amount]').type(-100)
        cy.get('#date').type('2021-03-17')
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr')
          .each(($el, index, $list) => {

            cy.get($el).find('td.income, td.expense')
              .invoke('text').then(text => {

                  cy.log(text)
              })
            })

    });
});