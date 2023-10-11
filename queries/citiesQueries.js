const db = require('../DB');

const getAllCities = async () => {
    const cities = await db.any('SELECT * FROM cities');
    return cities;
  };
  
  module.exports = {
    getAllCities,
  };
  