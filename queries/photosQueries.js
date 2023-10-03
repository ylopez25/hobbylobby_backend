const db = require('../DB');

const getAllPhotosbyUserId = async (id) => {
  const photos = await db.any('SELECT * FROM photodump WHERE user_id = $1', [id]);
  return photos;
};

module.exports = {
  getAllPhotosbyUserId,
};
