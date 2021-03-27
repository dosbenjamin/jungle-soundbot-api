import multer from 'fastify-multer'

export default async fastify => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: upload.single('sound'),
    handler: async ({ body: { author, command }, file }) => {
      const { knex } = await fastify.bookshelf

      return knex('sounds')
        .insert({ command, author })
    }
  })
}
