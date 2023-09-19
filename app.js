const express = require("express");
// const userData = require("./usersData.json");
const cors = require("cors");
const usersController = require("./controllers/usersController");

const app = express();
app.use(cors());
app.use('/users', usersController);

app.get("/", (request, response) => {
  response.status(200).json({ data: "Service is running!" });
});


module.exports = app;
