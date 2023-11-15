const db = require("../DB");
const { getPhotosbyUserId } = require("./photosQueries");

const getAllUsersV2 = async () => {
  const users = await db.any("SELECT * FROM users");
  return users;
};

const getAllUsersWithPhotosV2 = async () => {
  const users = await getAllUsersV2();
  for (const user of users) {
    const { id } = user;
    const photos = await getPhotosbyUserId(id);
    user.photos = photos;
  }
  return users;
};

const getUserbyIdV2 = async (id) => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
  return user;
};

//CREATE IMAGE? or USER?
const createPhoto = async (post) => {
  try {
    let { photo } = post;
    const newPost = await db.one("INSERT INTO photos (photo) VALUES ($1) RETURNING *", [photo]);
    return newPost;
  } catch (e) {
    return e;
  }
};

//UPDATE USER PROFILE
const updateUser = async (id, user) => {
  try {
    const updatedUser = await db.one("UPDATE users SET user_name=$1, firstname=$2, city_name=$3, skill=$4, pic=$5 WHERE id=$6 RETURNING *", [user.user_name, user.firstname, user.city_name, user.skill, user.pic, id]);
    return updatedUser;
  } catch (err) {
    return err;
  }
};

//delete photos
const deletePhoto = async (id) => {
  try {
    const deletedPhoto = await db.one("DELETE FROM photos WHERE id=$1 RETURNING *", id);
    return deletedPhoto;
  } catch (err) {
    return "error";
  }
};

module.exports = {
  getAllUsersV2,
  getUserbyIdV2,
  getAllUsersWithPhotosV2,
  createPhoto,
  deletePhoto,
  updateUser,
};
