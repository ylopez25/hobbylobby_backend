const db = require('../DB');

const getPhotosbyUserId = async (id) => {
  const photos = await db.any('SELECT * FROM photos WHERE user_id = $1', [id]);
  return photos;
};

module.exports = {
  getPhotosbyUserId,
};
