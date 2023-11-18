const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/usersController");
const usersControllerV2 = require("./controllers/usersControllerV2");
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersController);
app.use("/v2/users", usersControllerV2);

app.get("/", (request, response) => {
  response.status(200).json({ data: "Service is running!" });
});

module.exports = app;
