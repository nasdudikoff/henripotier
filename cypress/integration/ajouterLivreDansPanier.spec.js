describe('test ajouter livres dans panier',()=>{

    beforeEach(()=>{
        cy.visit('http://localhost:3000') 
    })

    it('test commander deux livres et avoir remise',()=>{

        cy.get('button[name="ajouterAuPanier"][data-id="c8fabf68-8374-48fe-a7ea-a00ccd07afff"]').click()
        cy.get('button[name="ajouterAuPanier"][data-id="a460afed-e5e7-4e39-a39d-c885c05db861"]').click()

        cy.get('label[data-class="nombreLivreDansPanier"]').contains(2)

        cy.get('a[data-id="showCart"]').click()

        cy.get('b[data-id="sous-total"]').contains(65)
        cy.get('b[data-id="reduction"]').contains(15)
        cy.get('b[data-id="total"]').contains(50)

        
    })
})


