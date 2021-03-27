export default async ({ bookshelf }) => {
  const { knex } = await bookshelf

  return !knex.table('sounds')
    && knex.schema.createTable('sounds', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('url')
      table.string('author')
    })
}
