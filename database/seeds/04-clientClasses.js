exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clientClasses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('clientClasses').insert([
        {class_id: 1, user_id: 1}
      ]);
    });
};