const express = require("express");
const { getAllUsersV2, getUserbyIdV2, getAllUsersWithPhotosV2 } = require("../queries/usersQueriesV2");
const { getPhotosbyUserId } = require("../queries/photosQueries");

const usersControllerV2 = express.Router();

usersControllerV2.get('/', async (request, response) => {
  try {
    const { include } = request.query;
    if (include === 'photos') {
      const users = await getAllUsersWithPhotosV2();
      return response.status(200).json({ data: users });
    } else {
      const users = await getAllUsersV2();
      return response.status(200).json({ data: users });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

usersControllerV2.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const user = await getUserbyIdV2(id);

    if (user) {
      return response.status(200).json({ data: user });
    } else {
      response.status(404).json({ error: `No student with id of ${id}` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

usersControllerV2.get("/:id/photos", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await getUserbyIdV2(id);
    if (user) {
      const photos = await getPhotosbyUserId(id);
      return response.status(200).json({ data: photos });
    }
    response.status(404).json({ error: `Could not find student with id ${id}` });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
});
module.exports = usersControllerV2;
