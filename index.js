import autoLoad from 'fastify-autoload'
import bookshelf from 'fastify-bookshelfjs'
import multer from 'fastify-multer'
import { resolve } from 'path'

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env

export default async (fastify, options) => {
  fastify.register(multer.contentParser)

  fastify.register(bookshelf, {
    client: 'pg',
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
    }
  })

  fastify.register(autoLoad, {
    dir: resolve('./plugins')
  })

  fastify.register(autoLoad, {
    dir: resolve('./routes')
  })
}
