describe('API-Test', () => {
    
        it('Test nagłówka User-Agent', () => {
          cy.request({
            method: 'GET',
            url: 'https://httpbin.org/user-agent',
            headers: {
              'User-Agent': 'Custom User-Agent'
            }
          }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body['user-agent']).to.eq('Custom User-Agent')
          })
        })

        it('Test niestandardowego naglowka', () => {
            cy.request({
              method: 'GET',
              url: 'https://httpbin.org/headers',
              headers: {
                'X-Test-Header': 'Test value'
              }
            }).then(response => {
              expect(response.status).to.eq(200)
              expect(response.body.headers['X-Test-Header']).to.eq('Test value')
            })
          })

          it('Test wysyłania losowego parametru', () => {
            const randomNumber = Math.floor(Math.random() * 666)
            cy.request({
              method: 'GET',
              url: `https://httpbin.org/get?randomNumber=${randomNumber}`
            }).then(response => {
              expect(response.status).to.eq(200)
              expect(response.body.args.randomNumber).to.eq(randomNumber.toString())
            })
          })
          it ('Test wysyłania kilku parametrów', () => {
            const car = {
              marque: 'Mercedes',
              model: 'G-class',
              production: "2018",
            }
            cy.request({
              method: 'POST',
              url: 'https://httpbin.org/post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: car
            }).then(response => {
              expect(response.status).to.eq(200)
              expect(response.body.json).to.deep.eq(car)
            })
          })

          it('Test wysyłania danych', () => {
            const car = {
              marque: 'Mercedes',
              model: 'G-class',
              production: "2018",
            }
            cy.request('POST', 'https://httpbin.org/post', car).then(response => {
              expect(response.status).to.eq(200)
              expect(response.body.json).to.deep.eq(car)
            })
          })

          it('Test odpowiedzi GET', () => {
            cy.request('GET', 'https://httpbin.org/get').then(response => {
              expect(response.status).to.eq(200)
              expect(response.body).to.have.property('args')
              expect(response.body).to.have.property('headers')
              expect(response.body).to.have.property('url')
            })
          })

          it('Test czy rządanie POST trwa krócej niz 2,5 sekundy', () => {
            cy.request({
              method: 'POST',
              url: 'https://httpbin.org/post',
              body: {
                marque: 'Mercedes',
                model: 'G-class'
              }
            }).then(response => {
              expect(response.status).to.eq(200)
              expect(response.duration).to.be.lessThan(2500)
            })
          })
          it('Test czy odpowiedź PUT jest prawidłowa', () => {
            cy.request({
              method: 'PUT',
              url: 'https://httpbin.org/put',
              body: {
                marque: 'Mercedes',
                model: 'G-class'
              }
            }).then(response => {
              expect(response.status).to.eq(200)
              expect(response.body).to.have.property('json')
              expect(response.body.json).to.deep.eq({
                marque: 'Mercedes',
                model: 'G-class'
              })
            })
          })
          //
          it('Test zwrócenia danych', () => {
            const carData = {marque: 'Mercedes', model: 'G-class'}
            cy.request('POST', 'https://httpbin.org/post', carData).then(response => {
              expect(response.status).to.eq(200)
              expect(response.body).to.have.property('json')
              expect(response.body.json).to.deep.eq(carData)
            })
          })
          it('Test URL', () => {
            const carData = {marque: 'Mercedes', model: 'G-class'}
            cy.request('GET', 'https://httpbin.org/get', carData).then(response => {
              expect(response.status).to.eq(200)
              expect(response.body).to.have.property('args')
              expect(response.body.args).to.deep.eq(carData)
            })
          })
          it('Test statusu kodu metody DELETE', () => {
            cy.request('DELETE', 'https://httpbin.org/delete').then(response => {
              expect(response.status).to.eq(200)
            })
          })
          })
     
      
  