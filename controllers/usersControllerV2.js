const express = require("express");
const { getAllUsersV2, getUserbyIdV2 } = require("../queries/usersQueriesV2");
const usersControllerV2 = express.Router();

usersControllerV2.get("/", (request, response) => {
  try {
    const users = getAllUsersV2();
    response.status(200).json({ data: users });
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

module.exports = usersControllerV2;
