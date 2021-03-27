import multer from 'fastify-multer'
import cloudinary from '../../utilities/cloudinary.js'

const cloudUpload = ({ buffer }) => {
  const file = `data:image/png;base64,${ buffer.toString('base64') }`

  return cloudinary.uploader
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
    handler: async ({ body: { author, command }, file }) => {
      const { knex } = await fastify.bookshelf
      const { url } = await cloudUpload(file)

      return knex('sounds')
        .insert({ command, author, url })
    }
  })
}
