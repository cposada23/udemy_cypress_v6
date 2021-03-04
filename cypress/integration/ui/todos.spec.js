
describe('Todo UI testing', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.wrap(
      {
        name: 'New Todo',
        completed: false
      }
    ).as('todo')
  })

  afterEach(() => {
    cy.deleteTodos()
  })

  it('Should add a new todo', () => {
    cy.get('@todo')
      .then(todo => {
        cy.intercept({
          method: 'POST',
          url: '/todos'
        }).as('createNewTodoRequest')
        cy.addNewTodo(todo)
        
        cy.wait("@createNewTodoRequest").then(xhr => {
          expect(xhr.request.body.name).to.eql(todo.name)
        })

        cy.get('.success')
          .should('be.visible')
        
        cy.get('.todo-item')
          .last()
          .should('contain.text', todo.name)
      })
  })

  it('Should be able to toggle the status of a todo correctly', () => {

    cy.get('@todo')
      .then(todo => {
        cy.addNewTodo(todo)

        cy.get('.todo-item')
          .last()
          .as('todo-item')

        cy.get('@todo-item')
          .within(() => {
            cy.get('.todo-checkbox')
              .as('todo-check')
            
            cy.get('@todo-check')
              .should('not.be.checked')
              .check()
              .should('be.checked')
              .uncheck()
              .should('not.be.checked')
          })
      })
  })

  it('Should delete a todo correctly', () => {
    cy.get('@todo')
      .then(todo => {
        cy.addNewTodo(todo)
        cy.get('.delete-item')
          .click()
      })
  })

  it('Should not add an empty todo', () => {
    cy.addNewTodo({name: ""})
    cy.get('.error').should('be.visible')
  })

})