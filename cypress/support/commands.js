Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Andressa')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#open-text-area').type('primeiro teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()
})


