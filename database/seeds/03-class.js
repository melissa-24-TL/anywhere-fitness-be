exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('class')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('class').insert([
        {className: 'pure yoga', instructorName: 'Test Instructor', classType: 'yoga', location: 'vegas', maxSize: 22, duration: 1.0, date: '11/10/2020' }
      ]);
    });
};