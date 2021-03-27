export default async fastify => {
  const { knex } = fastify.bookshelf

  fastify.get('/', () => knex('sounds'))

  fastify.get('/:sound', ({
    params: { sound }
  }) => knex('sounds').where({ command: sound }))
}
