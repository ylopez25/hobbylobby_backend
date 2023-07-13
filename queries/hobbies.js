// //require config
// const db = require('../db/dbconfig.js');

// //queries

// //INDEX
// const getAllHobbies = async () => {
//     try {
//         const allHobbies = await db.any('SELECT * FROM hobbies');
//         return allHobbies;
//     } catch (err) {
//         return err;
//     }
// }

// //SHOW
// const getHobby = async (id) => {
//     try {
//         const oneHobby = await db.one('SELECT * FROM hobbies where id=$1', id)
//     } catch (err) { 
//         return err;
//     }
// }

// //modeule exports is an object
// module.exports = {
//     getAllHobbies,
//     getHobby,
// }