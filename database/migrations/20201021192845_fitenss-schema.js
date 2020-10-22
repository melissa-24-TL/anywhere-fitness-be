
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
      tbl.increments();
      tbl.string('email').unique().notNullable();
      tbl.string('username').notNullable();
      tbl.string('name').notNullable();
      tbl.string('password').notNullable();
      tbl.string('role').notNullable().defaultTo('client');
  })
  .createTable('class', tbl => {
      tbl.increments();
      tbl.string('className').notNullable().unique();
      tbl.string('instructorName').notNullable();
      tbl.string('classType').notNullable();
      tbl.string('location').notNullable();
      tbl.string('date').notNullable();
      tbl.integer('maxSize').notNullable();
      tbl.float('duration').notNullable();
      tbl.bool('signedUp').defaultTo('false');
      tbl.integer('currentMembers').defaultTo(0);
  })
  .createTable('instructor', tbl => {
      tbl.increments();
      tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.integer('class_id').unsigned().notNullable().references('id').inTable('class').onUpdate('CASCADE').onDelete('CASCADE');
  })
  .createTable('clientClasses', tbl => {
      tbl.increments();
      tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.integer('class_id').unsigned().notNullable().references('id').inTable('class').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('instructor')
    .dropTableIfExists('clientClasses')
    .dropTableIfExists('class')
    .dropTableIfExists('users')
};
