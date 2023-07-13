// //DEPENDENCIES
// const express = require('express');
// // const cors = require('cors');
// const hobbies = require("./hobbies/hobby_db.json");

// //CONFIGURATION
// const app = express();
// console.log('hiii, again')

// //MIDDLEWARE
// // app.use(cors());
// //app.use(express.json());

// //ROUTES
// app.get('/', (req,res) => {
//     //change this to res.send.json
//     res.send('Welcome to hobby lobby!')
// })

// //app.use('/hobbies', hobbies)
// app.get('/hobbies', (request, response) => {
//     try {
//       const { students } = hobbies;
//       response.status(200).json({ data: students });
//     } catch (err) {
//       response.status(500).json({ error: err.message });
//     }
//   });

// // app.get('/hobbies/:id',(req,res) => {
// //     try{
// //         if(hobbies[req.params.id]) {
// //                 res.send(hobbies[req.params.id])
// //                }else {
// //                 res.send('cannot find any hobby at this index')
// //                }
// //     }catch(err) {
// //         res.send('err')
// //     }
// //});

// //EXPORT
// module.exports = app;


const express = require('express');
const userData = require('./usersData.json');


const app = express();


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