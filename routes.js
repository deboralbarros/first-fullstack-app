const { Router } = require("express");

const UserController = require("./UserController");

const routes = Router();

routes.get("/api/user", UserController.index);
routes.get("/api/user/:name", UserController.show);
routes.post("/api/user", UserController.create);

module.exports = routes;
