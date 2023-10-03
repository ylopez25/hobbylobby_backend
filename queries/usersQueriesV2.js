const db = require('../DB');
const { getAllPhotosbyUserId } = require("./photosQueries");

const getAllUsersV2 = async () => {
  const users = await db.any('SELECT * FROM users');
  return users;
};

const getAllUsersWithPhotosV2 = async () => {
  const users = await getAllUsersV2();
  for(const user of users) {
    const { id } = user;
    const photos = await getAllPhotosbyUserId(id);
    user.photos = photos;
  }
  return users;
};

const getUserbyIdV2 = async (id) => {
  const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id,]);
  return user;
};

module.exports = {
  getAllUsersV2,
  getUserbyIdV2,
  getAllUsersWithPhotosV2,
};
