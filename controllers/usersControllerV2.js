const express = require("express");
const { getAllUsersV2, getUserbyIdV2, getAllUsersWithPhotosV2 } = require("../queries/usersQueriesV2");
const { getAllPhotosbyUserId } = require("../queries/photosQueries");

const usersControllerV2 = express.Router();

usersControllerV2.get("/", (request, response) => {
  try {
    const { include } = request.query;
    if (include === "photos") {
      const users = getAllUsersWithPhotosV2();
      return response.status(200).json({ data: users });
    } else {
      const users = getAllUsersV2();
      return response.status(200).json({ data: users });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

usersControllerV2.get("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const user = getUserbyIdV2(id);
    if (user) {
      response.status(200).json({ data: user });
    } else {
      response.status(404).json({ error: `No student with id of ${id}` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

usersControllerV2.get("/:id/photos", (request, response) => {
  try {
    const { id } = request.params;
    const user = getUserbyIdV2(id);
    if (user) {
      const photos = getAllPhotosbyUserId(id);
      return response.status(200).json({ data: photos });
    }
    response.status(404).json({ error: `Could not find student with id ${id}` });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
});
module.exports = usersControllerV2;
