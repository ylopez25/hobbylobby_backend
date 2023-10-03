const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/usersController");
const usersControllerV2 = require("./controllers/usersControllerV2");

const app = express();

app.use(cors());
app.use("/users", usersController);
app.use("/v2/users", usersControllerV2);

app.get("/", (request, response) => {
  response.status(200).json({ data: "Service is running!" });
});

module.exports = app;
