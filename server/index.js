const express = require('express');
let app = express();

// import github helper
let git = require('../helpers/github.js');

// get parser 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// server client files 
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('req.body:', req.body);
  res.json(req.body);
  git.getReposByUsername(req.body.term);
  //res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send('GET');
  //res.end();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

