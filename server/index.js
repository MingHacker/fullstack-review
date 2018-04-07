const express = require('express');
let app = express();

// import Github API helper
let git = require('../helpers/github.js');

// import DB 
let db = require('../database/index.js');

// get parser 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// server client files 
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  console.log('req.body:', req.body);
  res.json(req.body);
  // and get the repo information from the github API, then
  git.getReposByUsername(req.body.term);
  // save the repo information in the database ==> info is only available in github callback
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // get top 25 repos info from db

  db.find((repos)=>{
    res.send(repos);
  }); 
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

