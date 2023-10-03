const express = require("express");
const { getAllUsers, getUserbyId } = require("../queries/usersQueries");
const usersController = express.Router();

usersController.get("/", (request, response) => {
  try {
    const users = getAllUsers();
    response.status(200).json({ data: users });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

usersController.get("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const user = getUserbyId(id);
    if (user) {
      return response.status(200).json({ data: user });
    } else {
      response.status(404).json({ error: `No student with id of ${id}` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = usersController;
