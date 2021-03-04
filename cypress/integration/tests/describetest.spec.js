describe('level 1 describe', () => {

  before(() => {
    cy.log("Before all level 1")
  })

  beforeEach(() => {
    cy.log("before each it level 1")
  })

  after(() => {
    cy.log('After level 1')
  })

  afterEach(() => {
    cy.log("After each level 1")
  })

  it('first it level 1', () => {
    cy.log('first it level 1')
  })


  it('Second it level 1', () => {
    cy.log('Second it level 1')
  })

  context('Level 2', () => {
    before(() => {
      cy.log("Before all level 2")
    })
    beforeEach(() => {
      cy.log('Before each level 2')
    })
    it('First it level 2', () => {
      cy.log('First it level 2')
    })
    it('Second it level 2', () => {
      cy.log('First it level 2')
    })
    afterEach(() => {
      cy.log('after each level 2')
    })
    after(() => {
      cy.log('afterl all level 2')
    })
  })

  describe('level 2a', () => {
    before(() => {
      cy.log("Before all level 2a")
    })
    beforeEach(() => {
      cy.log('Before each level 2a')
    })
    it('First it level 2', () => {
      cy.log('First it level 2a')
    })
    it('Second it level 2', () => {
      cy.log('First it level 2a')
    })
    afterEach(() => {
      cy.log('after each level 2a')
    })
    after(() => {
      cy.log('afterl all level 2a')
    })
  })

})