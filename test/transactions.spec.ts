import { expect, test, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    // execSync('npm run knex migrate:latest')
    // Assegura que antes de executar os testes, o app esteja pronto
    await app.ready()
  })

  afterAll(async () => {
    // Assegura que após executar os testes, o app seja fechado
    await app.close()
  })
  /*
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
*/
  test('statusCode test ok?', () => {
    const responseStatusCode = 201

    expect(responseStatusCode).toEqual(201)
  })

  // test.only => executa somente este teste
  // test.skip => Não executa este teste
  // test.todo => Não executa e fica de lembrete
  test('should be able to create a new transaction 1?', async () => {
    // const response = await request(app.server)
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    // console.log(response.headers) // Uma forma de mostrar o Cookie
    // console.log(response.get('Set-Cookie')) // Uma forma de mostrar o Cookie
  })

  test('should be able to list all transactions?', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    // console.log(listTransactionsResponse.body)
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  test('should be able to get a specific transaction?', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  test('should be able to get the summary?', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    // console.log(listTransactionsResponse.body)
    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
