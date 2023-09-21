const photosDataV2 = require("../data/photosDataV2.json");

const getAllPhotosbyUserId = (id) => {
  const results = [];
  const { photodump } = photosDataV2;
  for (const photo of photodump) {
    const { userId } = photo;
    if (userId === id) {
      results.push(photo);
    }
  }
  return results;
};

module.exports = {
  getAllPhotosbyUserId,
};
