
describe('Different API calls', () => {

  beforeEach(() => {
    cy.fixture('todos').then(todos => {
      return todos[0]
    }).as('todo')
  })

  it('Should add a new todo using POST', ()  => {
    
    cy.get('@todo').then(todo => {
      cy.createTodoUsingApi(todo)
        .then(response => {
          cy.log(response)
          expect(response.status).to.eq(201)
          expect(response.body.name).to.eq(todo.name)
        })
    })
  })

  afterEach(() => {
    cy.deleteAllTodosUsingAPI()
  })

  context('To validate GET, DELETE and PUT there needs to be at least one todo created', () => {
    beforeEach(() => {
      cy.get("@todo").then(todo => {
        cy.createTodoUsingApi(todo).then(response => response.body)
      }).as('existingTodo')
    })

    it('Should GET to retreive a todo from the api', () => {
      cy.get('@existingTodo').then(todo => {
        cy.getTodo(todo.id).then(response => {
          expect(response.status).to.eq(200)
          expect(response.body[0]).to.deep.equal(todo)
        })
      })
    });

    it('Should DELETE a todo using the API', () => {
      cy.get('@existingTodo').then(todo => {
        cy.deleteTodo(todo.id).then(response => {
          cy.log(response)
          expect(response.status).to.eq(200)
        })
      })
    })

  })
})