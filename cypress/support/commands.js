// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('addNewTodo', (todo) => {
  // Create the todo
  cy.get('.todo-input')
    .type(`${todo.name}{enter}`)
    .as('new-todo')
  
  if(todo.isCompleted) {
    cy.get('.todo-item')
    .last()
    .within(() => {
      cy.get('.todo-checkbox').check()
    })
  }
})

Cypress.Commands.add('createTodoUsingApi', (todo) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/todos',
    body: todo
  })
})

Cypress.Commands.add('deleteAllTodosUsingAPI', () => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:8080/todos',
  }).then(reponse => {
    cy.wrap(reponse.body).each(todo => {
      cy.request({
        method: 'DELETE',
        url: `http://localhost:8080/todos/${todo.id}`
      })
    })
  })
})

Cypress.Commands.add('deleteTodo', (id) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8080/todos/${id}`
  })
})

Cypress.Commands.add('getTodo', (id) => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:8080/todos',
    qs: { "id": id }
  })
})

Cypress.Commands.add('deleteTodos', () => {
  cy.get('body').then($el => {
    if($el.find('.delete-item').length > 0) {
      cy.get('.delete-item')
        .click({multiple: true})
    }
  })
})