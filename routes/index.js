import fastify from "fastify"

export default async fastify => fastify.get('/', () => 'Jungle Soundbot API')
