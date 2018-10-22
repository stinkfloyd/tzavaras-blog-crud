exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([{
          id: 1,
          title: 'Broncos Destroy Cardinals!',
          content: 'What a game!'
        },
        {
          id: 2,
          title: 'Stinkfloyd is streamer of the year!',
          content: 'Congratulations on a great year!'
        },
        {
          id: 3,
          title: 'Fantasy Football Beatdown',
          content: 'Team SMYTD Lost this week in a pathetic showing.'
        }
      ]).then(function () {
        // Moves id column (PK) auto-incrementer to correct value after inserts
        return knex.raw("SELECT setval('blogs_id_seq', (SELECT MAX(id) FROM blogs))")
      })
    })
}