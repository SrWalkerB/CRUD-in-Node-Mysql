// Update with your config settings.

require("dotenv").config();

module.exports = {

  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DATABASE,
      host: process.env.HOST,
      user: process.env.USER_DATABASE,
      password: process.env.PASSWORD_DATABASE
    },
    migrations: {
      tableName: 'migrations',
      directory: "./src/Database/Migrations/"
    }
  }

};
