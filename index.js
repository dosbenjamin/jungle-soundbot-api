import autoLoad from 'fastify-autoload'
import { resolve } from 'path'

export default async (fastify, options) => {
  fastify.register(autoLoad, {
    dir: resolve('./routes')
  })
}
