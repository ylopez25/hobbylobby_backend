const express = require('express');
const userData = require('./usersData.json');
const cors = require('cors')


const app = express();
app.use(cors())

app.get('/', (request, response) => {

  response.status(200).json({ data: 'Service is running!' });
});

app.get('/users', (request, response) => {
  try {
    const { users } = userData;
    response.status(200).json({ data: users });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});


app.get('/users/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { users } = userData;
    const user = users.find((user) => user.id === id);
    if (user) {
      response.status(200).json({ data: user });
    } else {
      response.status(404).json({ error: `No student with id of ${id}` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = app;