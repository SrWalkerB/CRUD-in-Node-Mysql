const knexfile = require("../../../knexfile");
const knex_Database = require("knex")(knexfile['development']);


module.exports = knex_Database;