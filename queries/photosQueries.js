const photoData = require("../data/photosDataV2.json");

const getAllPhotos= () => {
    const { photodump } = photoData;
    return photodump;
}

const getPhotobyId = (id) => {
    const { photodump } = photoData;
    const photo = photodump.find((photo) => photodump.id === id);
    return photo;
}

module.exports = {
    getAllPhotos,
    getPhotobyId,
};