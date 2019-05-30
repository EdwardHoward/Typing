describe('typing', () => {

   beforeEach(function(){
      cy.visit('/');
   });

   describe('timer', () => {
      it('starts at 1:00', () => {
         cy.get('#root > div > div > div > div.toolbar > span > span')
            .should('contain', '1:00');
      });

      it('counts down', () => {
         cy.get('.toolbar input').type("a")
         cy.wait(1000).then(() => {
            cy.get('#root > div > div > div > div.toolbar > span > span').should('contain', '0:59');
         });
      })
   });

   it('adds "error" class on word', () => {
      cy.get('.toolbar').find('input').type("asdfasdf");
      cy.get('.word:first-child').should('have.class', 'error');
   });
   
   it('adds "correct" class on word', () => {
      cy.get('.word:eq(0)').invoke('text').then(text => {
         cy.get('.toolbar').find('input').type(text + " ").then(() => {
            cy.get('.word:eq(0)').should('have.class', 'correct').screenshot();
         });
      });
   });

   afterEach(() => {
      cy.screenshot();
   });
});
