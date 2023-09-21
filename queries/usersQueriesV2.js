const userData = require("../data/usersDataV2.json");

const getAllUsersV2= () => {
    const { users } = userData;
    return users;
}

const getUserbyIdV2 = (id) => {
    const { users } = userData;
    const user = users.find((user) => user.id === id);
    return user;
}

module.exports = {
    getAllUsersV2,
    getUserbyIdV2,
};