const userData = require("../usersData.json");

const getAllUsers= () => {
    const { users } = userData;
    return users;
}

const getUserbyId = (id) => {
    const { users } = userData;
    const user = users.find((user) => user.id === id);
    return user;
}

module.exports = {
    getAllUsers,
    getUserbyId,
};