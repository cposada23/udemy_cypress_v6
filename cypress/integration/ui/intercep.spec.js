
describe('Using cy.intercept command', () => {
  before(() => {
    cy.fixture('todos').each((todo, index) => {
      if(index%2==0) {todo.isComplete = true}
      todo.id = index
    }).as('todos')

    cy.get('@todos').then(todos => {
      cy.intercept({
        method: 'GET',
        url: '/todos'
      },{
        body: todos
      })
    })
    cy.visit('/')
  })

  it('Should filter the completed todos correctly', () => {
    cy.contains('Complete').click()
    cy.url().should('contain', '/complete')
    cy.get('.todo-checkbox').each(check => {
      cy.wrap(check).should('be.checked')
    })
  })

  it('Should filter the active todos correctly', () => {
    cy.contains('Active').click()
    cy.url().should('contain', '/active')
    cy.get('.todo-checkbox').each(check => {
      cy.wrap(check).should('not.be.checked')
    })
  })
})