//dependencies
const express = require("express");
//queries
const { getAllUsersV2, getUserbyIdV2, getAllUsersWithPhotosV2, createPhoto, deletePhoto, updateUser } = require("../queries/usersQueriesV2");
const { getPhotosbyUserId } = require("../queries/photosQueries");
const { getAllCities } = require("../queries/citiesQueries");


const usersControllerV2 = express.Router({mergeParams:true});

//INDEX of ALL USERS AND PHOTOS AND CITIES
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

//SHOW ONE USER
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

//put update

usersControllerV2.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id,req.body);
    console.log('Updated User:', updatedUser);

      res.status(200).json({data: updatedUser});
    
  } catch (e) {
    res.json({ err: e.message });
  }
});


//SHOW USERS PHOTOS
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

//CREATE - POST METHOD photos
// usersControllerV2.post("/:id/photos", async (req, res, next) => {
//   try {
//     const userPost = createPhoto(req.body);
//     if (userPost.id) {
//       res.status(200).json({ payload: userPost });
//     } else {
//       throw "Photo upload did not upload";
//     }
//   } catch (e) {
//     return next(e);
//   }
// });


//delete
usersControllerV2.delete("/:id/photos", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserbyIdV2(id);
    if(user) {
      const deletedphoto = await deletePhoto(id);
      res.status(200).json(deletedphoto);
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


module.exports = usersControllerV2;
