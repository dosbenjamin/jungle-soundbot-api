import autoLoad from 'fastify-autoload'
import bookshelf from 'fastify-bookshelfjs'
import { resolve } from 'path'

const {
  DATABASE_URL,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env

export default async (fastify, options) => {
  fastify.register(bookshelf, {
    client: 'pg',
    connection: {
      host: DATABASE_URL,
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
