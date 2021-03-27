import multer from 'fastify-multer'

export default async fastify => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: upload.single('sound'),
    handler: (request: { body, file }) => {
      console.info(body, file)
    }
  })
}
