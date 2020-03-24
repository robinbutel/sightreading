const express = require('express');
const srv = express();
const port = 3000;

srv.get('/', (request, response) => {
  response.send('This is the server<br/><a href=\"app.html\">The app</a><br/><a href=\"menu.html\">The menu</a>');
});

srv.use(express.static('../sightreadingapp/'));

srv.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log("server is listening on " + port);
});

srv.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err);
  response.status(500).send('Something broke!');
});
