const express = require("express");
const { getAllUsersV2, getUserbyIdV2, getAllUsersWithPhotosV2, updateUsers, deleteUsers } = require("../queries/usersQueriesV2");
const { getPhotosbyUserId } = require("../queries/photosQueries");
const { getAllCities } = require("../queries/citiesQueries");

const usersControllerV2 = express.Router();

usersControllerV2.get("/", async (request, response) => {
  try {
    const { include } = request.query;
    if (include === "photos") {
      const users = await getAllUsersWithPhotosV2();
      const cities = await getAllCities();
      return response.status(200).json({ data: users, cities });
    } else {
      const cities = await getAllCities();
      const users = await getAllUsersV2();
      return response.status(200).json({ data: users, cities });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

usersControllerV2.get("/:id", async (request, response) => {
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

//put update 

// usersControllerV2.put('/:id/photos', async (req,res) => {
//   const {id} = req.params;
//   try{
//     const updateUser = await updateUsers(id,req.body);
//     res.status(200).json(updateUser.length ? updateUser : [updateUser] )
//   }catch (e){
//     res.status(400).json({err:e.message})
//   }
// })

//delete 
usersControllerV2.delete('/:id/photos', async (req,res) => {
  const {id} = req.params;
  try{
    const deleteUser = await deleteUsers(id);
    res.status(200).json(deleteUser)
  }catch (e) {
    res.status(400).json({error:e.message})
  }
})

//post 

module.exports = usersControllerV2;
