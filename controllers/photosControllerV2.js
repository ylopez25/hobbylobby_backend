const express = require("express");
const { getAllPhotos, getPhotobyId } = require("../queries/photosQueries");
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
      response.status(200).json({ data: user });
    } else {
      response.status(404).json({ error: `No student with id of ${id}` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = usersController;
