exports.up = (knex, Promise) => knex.schema.createTable('blogs', (table) => {
  // TABLE COLUMN DEFINITIONS HERE
  table.increments()
  table.string('title').notNullable().defaultTo('')
  table.text('content').notNullable().defaultTo('')
  table.timestamps(true, true)
})


exports.down = (knex, Promise) => knex.schema.dropTableIfExists('blogs')