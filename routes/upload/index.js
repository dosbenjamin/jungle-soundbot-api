import multer from 'fastify-multer'
import cloudinary from 'cloudinary'

const {
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET
} = process.env

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET
})

const cloudUpload = ({ buffer }) => {
  const file = `data:audio/mpeg;base64,${ buffer.toString('base64') }`

  return cloudinary.v2.uploader
    .unsigned_upload(file, 'jyeiofw9', {
      resource_type: 'raw',
      folder: 'jungle-soundbot/'
    })
}

export default async fastify => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: upload.single('sound'),
    handler: async ({ body: { author, command }, file }, reply) => {
      try {
        const { url } = await cloudUpload(file)

        const result = await fastify.bookshelf.knex('sounds')
          .insert({ command, author, url })

        if (result) return result
      } catch ({ code }) {
        if (code === '23505') {
          const error = new Error('This command already exists.')
          reply.code(409).send(error)
        }
      }
    }
  })
}
