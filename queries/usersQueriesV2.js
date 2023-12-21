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

//CREATE PHOTO
const createPhoto = async (photos) => {
  try {
    let { photo, user_id } = photos;
    const newPost = await db.one("INSERT INTO photos (photo,user_id) VALUES ($1,$2) RETURNING *", [photo, user_id]);
    return newPost;
  } catch (error) {
      // Check if it's a specific error type, e.g., a constraint violation
    if (error.code === '23505') {
      // Unique constraint violation (duplicate entry)
      return { error: 'Duplicate entry. This photo already exists.' };
    }

    // Check if it's a connection issue
    if (error.code === 'ECONNREFUSED') {
      return { error: 'Unable to connect to the database.' };
    }

    // Handle other types of errors
    console.error('Error in createPhoto:', error.message);
    return { error: 'An unexpected error occurred while creating the photo.' };
  }
  
};

//UPDATE USER PROFILE
const updateUser = async (id, users) => {
  const { user_name, email, city_name, city_id, first_name, last_name, pic, skill } = users;
  try {
    const updatedUser = await db.one("UPDATE users SET user_name=$1, email=$2, city_name=$3, city_id=$4, first_name=$5, last_name=$6, pic=$7, skill=$8 WHERE id=$9 RETURNING *", [user_name, email, city_name, city_id, first_name, last_name, pic, skill, id]);
    return updatedUser;
  } catch (err) {
    console.error("Database Error:", err);
    return err;
  }
};

//delete photos //its deleting id
const deletePhoto = async (id) => {
  try {
    const deletedPhoto = await db.one("DELETE FROM photos WHERE photos_user_id=$1 RETURNING *", id);
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
