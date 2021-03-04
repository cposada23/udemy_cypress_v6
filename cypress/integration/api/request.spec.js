
describe('Request command suite', () => {
  it('Get request', () => {
    cy.request('GET', 'http://localhost:8080/todos')
      .then(response => {
        cy.log(response)
        cy.log(response.body)
        cy.log(response.headers)
        expect(response.status).to.be.eq(200)
      })
  })

  it('accepts propertis to make the request', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/todos',
      qs: {"id": 1}
    }).then(reponse => {
      cy.log(reponse.body)
      cy.log(reponse.body.length)
    })
  })

  it('post request', () => {
    cy.request(
      'POST',
      'http://localhost:8080/todos',
      {
        "name": 'test1',
        "isComplete": false
      }
    ).then(response => {
      expect(response.status).to.eq(201)
    })

    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/todos',
      body: {
        "name": "name",
        "isComplete": false
      }
    }).then(response => {
      expect(response.status).to.eq(201)
    })
  })

  it('put request', () => {
    // cy.request(
    //   'PUT',
    //   'http://localhost:8080/todos/1',
    //   {
    //     "name": 'test1',
    //     "id": 1,
    //     "isComplete": false
    //   }
    // ).then(response => {
    //   expect(response.status).to.eq(201)
    // })
  })

  it('delete request', () => {
    // cy.request(
    //   'DELETE',
    //   'http://localhost:8080/todos/1'
    // ).then(response => {
    //   expect(response.status).to.eq(200)
    // })
  })

  it('Secured api', () => {
    // cy  
    //   .request({
    //     method: 'GET',
    //     url: 'http://localhost:8080/courses',
    //     auth: {
    //       bearer: '<token>'
    //     }
    //   })

    //   cy  
    //   .request({
    //     method: 'GET',
    //     url: 'http://localhost:8080/courses',
    //     headers: {
    //       Authorization: '<token>'
    //     }
    //   })
  })

})