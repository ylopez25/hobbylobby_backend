const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/usersController");
const usersControllerV2 = require("./controllers/usersControllerV2");
const db = require('./DB');

const app = express();
app.use(cors());
app.use("/users", usersController);
app.use("/v2/users", usersControllerV2);

app.get("/", (request, response) => {
  response.status(200).json({ data: "Service is running!" });
});

app.get("/tests", async (req,res) => {
  try{
    const test = await db.any('SELECT * FROM TESTS;');
    res.status(200).json({data:test})
  }catch(e) {
    res.status(500).json({err:err.message})
  }
})
module.exports = app;
