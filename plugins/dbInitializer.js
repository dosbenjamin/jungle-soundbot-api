export default async ({ bookshelf }) => {
  const { schema } = await bookshelf.knex
  const soundsExists = await schema.hasTable('sounds')

  return !soundsExists
    && schema.createTable('sounds', table => {
      table.increments('id').primary()
      table.string('command').unique()
      table.string('url')
      table.string('author')
    })
}
