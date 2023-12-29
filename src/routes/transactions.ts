import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import crypto from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function helloRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    let executar = 'S'
    if (executar === 'S') {
      // COMANDOS DDL
      // Tabela: transactions
      await knex.schema.dropTable('transactions')

      await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary()
        table.text('title').notNullable()
        table.decimal('amount', 10, 2).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.uuid('session_id').after('id').index()
      })

      /*
        se quiser excluir só um campo
        await knex.schema.alterTable('transactions', (table) => {
            table.dropColumn('session_id')
        })
        */

      /* se quiser incluir só um campo
      await knex.schema.alterTable('transactions', (table) => {
        table.uuid('session_id').after('id').index()
      })
      */

      // Visualização de recursos
      const tables = await knex('sqlite_schema').select('*')
      return tables
    }

    executar = 'N'
    if (executar === 'S') {
      // Comando de inserção e retorno de todos os campos tabela do registro incluído
      const transactions = await knex('transactions')
        .insert({
          id: crypto.randomUUID(),
          title: 'Ayron',
          amount: 7000,
        })
        .returning('*') // Nesta linha já faz retornar todos os campos da tabela do registro incluído

      return { transactions }
    }

    executar = 'N'
    if (executar === 'S') {
      // Comando para selecionar todos os registros da tabela transactions
      const transactions = await knex('transactions').select('*')
      // .where('amount', 1000)
      return { transactions }
    }
  })
}

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .select('*')
        .where('session_id', sessionId)

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .select('*')
        .where({
          session_id: sessionId,
          id,
        })
        .first() // First(): Força o retorno de um objeto, invés de um array de objetos
      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first() // First(): Força o retorno de um objeto, invés de um array de objetos
      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    // {title, amount, type: credit ou debit}

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
