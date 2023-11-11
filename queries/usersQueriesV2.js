const db = require('../DB');
const { getPhotosbyUserId } = require("./photosQueries");

const getAllUsersV2 = async () => {
  const users = await db.any('SELECT * FROM users');
  return users;
};

const getAllUsersWithPhotosV2 = async () => {
  const users = await getAllUsersV2();
  for(const user of users) {
    const { id } = user;
    const photos = await getPhotosbyUserId(id);
    user.photos = photos;
  }
  return users;
};

const getUserbyIdV2 = async (id) => {
  const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id,]);
  return user;
};

//update
// const updateUsers = async(id,users) => {
//   try {
//     const dbQuery = updateUsersQuery(ids, users)
//     if (!ids.includes(',')) {
//       return await db.one(dbQuery.qString, dbQuery.qParams)
//     }

//     return await db.tx(t => {
//       const queries = dbQuery.map(q => db.one(q.qString, q.qParams))
//       return t.batch(queries)
//     })
//   } catch (err) {
//     return 'error'
//   }
// }


//delete 
const deleteUser = async (ids) => {
  try {
    if (!ids.includes(',')) {
      return await db.one('DELETE FROM users WHERE id=$1 RETURNING *;', ids)
    }
    return await db.any(`DELETE FROM users WHERE id IN (${ids}) RETURNING *;`)
  } catch (err) {
    return 'error'
  }
}

module.exports = {
  getAllUsersV2,
  getUserbyIdV2,
  getAllUsersWithPhotosV2,
  deleteUser
};
