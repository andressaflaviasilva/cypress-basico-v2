/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'primeiro teste primeiro teste primeiro teste primeiro teste primeiro teste primeiro teste primeiro teste primeiro teste primeiro teste primeiro teste '
        cy.get('#firstName').type('Andressa')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('span.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('#firstName').type('Andressa')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('testeteste.com.br')
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando não informa numeros', function () {
        cy.get('#phone')
            .type('teste com letras')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Andressa')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click() é mais semantico colocar o nome específico
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Andressa')
            .should('have.value', 'Andressa')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@teste.com.br')
            .should('have.value', 'teste@teste.com.br')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12345678')
            .should('have.value', '12345678')
            .clear()
            .should('have.value', '')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('span.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback',function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
    })
    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
        .should('be.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Andressa')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('teste@teste.com.br')
        // cy.get('#phone-checkbox').click() é mais semantico colocar check em vez de click
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click() é mais semantico colocar o nome específico
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){ //função de callback que recebe o elemento input que seleciona arquivos
                console.log($input) //loga onde está o nome do arquivo
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    
    it('um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'}) // a ação drag-drop é o arrasta e cola arquivo
            .should(function($input){ //função de callback que recebe o elemento input que seleciona arquivos
                console.log($input) //loga onde está o nome do arquivo
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('samplefile') // comando fixture permite criar um alias
        cy.get('input[type="file"]')
            .selectFile('@samplefile') // onde chamo a alias criado acima sem ter que passar o caminho relativo, o @ identifica o alias
            .should(function($input){ //função de callback que recebe o elemento input que seleciona arquivos
                console.log($input) //loga onde está o nome do arquivo
                expect($input[0].files[0].name).to.equal('example.json')
            })
            
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a') //pega o ancora do site
        .should('have.attr', 'target', '_blank') // verivica se atributo target com o valor blanck
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a') //pega o ancora do site
            .invoke('removeAttr','target') // remove o target e exibe a política de privacidade na mesma aba
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    
})
