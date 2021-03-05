describe('filter', () => {

  before(() => {
    cy.deleteAllTodosUsingAPI()
    cy.fixture('todos').each((todo, index) => {
      if(index%2==0) {todo.isComplete = true}
      cy.createTodoUsingApi(todo)
    }).as('todos')
    cy.visit('/')
    cy.get('@todos').then(todos => {
      cy.get('.Todo-List li', {timeout: 5000})
        .should('have.length', todos.length)
    })
    
  })

  after(() => {
    cy.deleteAllTodosUsingAPI()
  })

  it('Should filter the completed todos correctly', () => {
    cy.contains('Complete').click()
    cy.url().should('contain', '/complete')
    cy.get('.todo-checkbox').each(check => {
      cy.wrap(check).should('be.checked')
    })
    cy.log('test')
  })

  it('Should filter the active todos correctly', () => {
    cy.contains('Active').click()
    cy.url().should('contain', '/active')
    cy.get('.todo-checkbox').each(check => {
      cy.wrap(check).should('not.be.checked')
    })
  })

})