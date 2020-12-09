const express = require("express");
const UsersControllers = require("../Controllers/UsersControllers");
const validacoes = require("../utils/validacoes");

const routes = express.Router();

routes.get("/users", UsersControllers.list);

routes.get("/users/:id", UsersControllers.list_id);

routes.post("/users/create", validacoes.validation_create_user, UsersControllers.create_user);

routes.put("/users/update/:id", validacoes.validation_update_user, UsersControllers.update_user);

routes.delete("/users/del/:id", UsersControllers.delete_user);


module.exports = routes;