
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'testinstructor@email.com', username: 'testinstructor', name: 'Test Instructor', role: 'instructor', password: '$2a$10$yFYMWxOQ2..FEYqF/7fWEevS3I7srGTgqJ1F/KuUXjlsDImyKOSve'},
        {email: 'testclient@email.com', username: 'testclient', name: 'Test Client', role: 'client', password: '$2a$10$yFYMWxOQ2..FEYqF/7fWEevS3I7srGTgqJ1F/KuUXjlsDImyKOSve'}
      ]);
    });
};
