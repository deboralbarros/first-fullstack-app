const express = require("express");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 8080;

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(port);
