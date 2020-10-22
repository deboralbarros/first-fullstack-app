const { v4 } = require("uuid");
const fs = require("fs");

const encrypt = require("./Encrypt");

let users = [];

if (fs.existsSync("dados.json")) {
  users = JSON.parse(fs.readFileSync("dados.json"));
}

module.exports = {
  index(req, res) {
    return res.json(users);
  },

  show(req, res) {
    const { name } = req.params;

    for (let i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        return res.json(users[i]);
      }
    }

    return res.json({ error: "Usuário inexistente" });
  },

  create(req, res) {
    const { user } = req.body;

    if (fs.existsSync("dados.json")) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].name === user.name) {
          return res
            .status(409)
            .json({ error: "Nome de usuário já está sendo usado" });
        }
      }
    }

    const id = v4();
    let { pass } = user;

    user["id"] = id;
    user["pass"] = encrypt(pass);
    users.push(user);

    fs.writeFileSync("dados.json", JSON.stringify(users));

    return res.status(201).json(user);
  },
};
