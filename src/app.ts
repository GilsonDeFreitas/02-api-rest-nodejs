import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes, helloRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

/*
//Hook que identifica todas as rotas
app.addHook('preHandler', async (request, reply) => {
  console.log(`[${request.method}] ${request.url}`)
})

app.get('/test', () => {
  return 'Hello World'
})
*/
app.register(helloRoutes, {
  prefix: 'hello',
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
