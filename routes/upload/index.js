import multer from 'fastify-multer'

export default async fastify => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: upload.single('sound'),
    handler: ({ body: { author, command }, file }) => {
      console.info(author, command)
      console.info(file)
    }
  })
}
