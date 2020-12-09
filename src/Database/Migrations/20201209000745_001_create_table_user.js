const knex_Database = require("../KnexDatabase/knex_Database");


exports.up = function(knex) {
  return knex_Database.schema.createTable("tb_users", table => {

    table.increments("id_user").notNullable();
    table.string("name", 20).notNullable();
    table.string("surname", 50).notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();

    table.timestamp("created_at").defaultTo(knex_Database.fn.now()).notNullable();
  })
};

exports.down = function(knex) {
  return knex_Database.schema.dropTable("tb_users");
};
