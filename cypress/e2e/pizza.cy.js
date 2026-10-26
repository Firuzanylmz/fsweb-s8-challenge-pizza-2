describe('Pizza sipariş uygulaması', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.contains('button', 'ACIKTIM').click()
  })

  it('İsim alanına metin yazılabilir', () => {
    cy.get('#isim')
      .type('Firuzan')
      .should('have.value', 'Firuzan')
  })

  it('Birden fazla malzeme seçilebilir ve kaldırılabilir', () => {
    cy.get('input[value="Pepperoni"]').check()
    cy.get('input[value="Mısır"]').check()
    cy.get('input[value="Mantar"]').check()
    cy.get('input[value="Soğan"]').check()

    cy.get('input[name="malzemeler"]:checked')
      .should('have.length', 4)

    cy.get('input[value="Mısır"]').uncheck()

    cy.get('input[name="malzemeler"]:checked')
      .should('have.length', 3)
  })

  it('Geçerli form gönderilir ve onay ekranı açılır', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          ...req.body,
          id: 'test-siparis-1',
          createdAt: '2026-10-26T10:00:00.000Z',
        },
      })
    }).as('siparisGonder')

    cy.get('.submit-button').should('be.disabled')

    cy.get('#isim').type('Firuzan')
    cy.get('input[name="boyut"][value="Orta"]').check()
    cy.get('#hamur').select('İnce')

    cy.get('input[value="Pepperoni"]').check()
    cy.get('input[value="Mısır"]').check()
    cy.get('input[value="Mantar"]').check()

    cy.get('.submit-button').should('be.disabled')

    cy.get('input[value="Soğan"]').check()
    cy.get('#siparis-notu').type('Dilimlenmiş olsun.')

    cy.get('.submit-button')
      .should('be.enabled')
      .click()

    cy.wait('@siparisGonder').then(({ request }) => {
      expect(request.body.isim).to.equal('Firuzan')
      expect(request.body.boyut).to.equal('Orta')
      expect(request.body.hamur).to.equal('İnce')

      expect(request.body.malzemeler).to.have.members([
        'Pepperoni',
        'Mısır',
        'Mantar',
        'Soğan',
      ])

      expect(request.body.adet).to.equal(1)
      expect(request.body.toplam).to.equal(105.5)
      expect(request.body.not).to.equal('Dilimlenmiş olsun.')
    })

    cy.get('.success-page')
      .should('be.visible')
      .and('contain.text', 'SİPARİŞ ALINDI')
      .and('contain.text', 'Firuzan')
      .and('contain.text', 'Orta')
      .and('contain.text', '105.50₺')
  })
})