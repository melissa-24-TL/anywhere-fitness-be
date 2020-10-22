exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructor').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructor').insert([
        {user_id: 1, class_id: 1, }
      ]);
    });
};