///<reference types="cypress" />
//import '../support/commands'
import {thePathsRoutes} from '../../../src/routes/PathsRoutes'

//describe()

/*
describe('Pruebas de la vista de registro', () => {
  it('Debería cargar la página de registro correctamente', () => {
    cy.visit(thePathsRoutes.register); // Cambia la ruta según tu aplicación
    //cy.contains('/auth/register').should('be.visible'); // Cambia el texto según tu página
  });





});
*/

describe('Tests of the log view', () => {

    it('Test: It should register a new user',  () => {

        

        const unique = Date.now() ;


        // Random values for the inputs simulate

        const email = `e2e_${unique}@example.com` ;

        const handlePA = `e2e ${unique}` ;

        const password123 = 'password123' ;


        cy.visit( thePathsRoutes.register ) ;


        cy.get('#name').type('Steve Jobs') ;

        cy.get('#email').type(email) ;

        cy.get('#handleProfileAlias').type(handlePA) ;

        cy.get('#password').type(password123) ;
        
        cy.get('#password_confirmation').type(password123)



        cy.get('input[type="submit"]').click() ;



        cy.contains('Register has been created correctly').should('be.visible')


        // ¿ the after register redirect is correct ?
        cy.location('pathname', {timeout: 10000}).should('eq', thePathsRoutes.login)




    } )

}  )


//npx cypress open