const userData = require("../data/usersDataV2.json");
const { getAllPhotosbyUserId } = require("./photosQueries");

const getAllUsersV2 = () => {
  const { users } = userData;
  return users;
};

const getAllUsersWithPhotosV2 = () => {
  const results = [];
  const users = getAllUsersV2();
  for (const user of users) {
    const { id } = user;
    const photos = getAllPhotosbyUserId(id);
    const copy = { ...user };
    copy.photos = photos;
    results.push(copy);
  }
  return results;
};

const getUserbyIdV2 = (id) => {
  const { users } = userData;
  const user = users.find((user) => user.id === id);
  return user;
};

module.exports = {
  getAllUsersV2,
  getUserbyIdV2,
  getAllUsersWithPhotosV2,
};
