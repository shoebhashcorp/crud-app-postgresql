exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", function(table) {
      table.increments("id").primary();
      table
        .string("username")
        .notNullable()
        .unique();
      table
        .string("email")
        .notNullable()
        .unique();
      table.string("timezone").notNullable();
      table.string("password_digest").notNullable();
      table.timestamps();
    })
    .createTable("addressBook", function(table) {
      table.increments("id").primary();
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("address").notNullable();
      table
        .integer("userID")
        .notNullable()
        .references("id")
        .inTable("users");

      table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users").dropTable("addressBook");
};
