describe('test affichage/recherche livres',()=>{

    beforeEach(()=>{
        cy.visit('http://localhost:3000') 
    })

    it('test affichage',()=>{

        cy.get('div[data-class="bookCard"]').should('have.length', 7)

    })

    it('test recherche',()=>{

        cy.get('input[name="searchBooks"]').type('sorcier')
        cy.get('div[data-class="bookCard"]').should('have.length', 1)
    })

})