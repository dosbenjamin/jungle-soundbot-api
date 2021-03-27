export default async ({ bookshelf }) => {
  const { knex } = await bookshelf
  const soundsExists = await knex.schema.hasTable('sounds')

  return !soundsExists
    && knex.schema.createTable('sounds', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('url')
      table.string('author')
    })
}
