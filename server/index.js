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

  // send back to client side total imported repos and updated repos
  console.log('req.body:', req.body);
  res.send(req.body);

  // and get the repo information from the github API, then
  git.getReposByUsername(req.body.term);

  // save the repo information in the database ==> info is only available in github callback
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.find((repos)=>{
    console.log('In the server:', repos);

    // Send the info from the latest request 
    // repos = repos.reverse();

    // // if totalRepos is greater than 25, remove the difference from the last user's repos
    // let totalRepos = 0;
    // repos.forEach(user => {
    //   totalRepos += user.repos.length;
    //   if(totalRepos > 25){
    //     let removeCount = totalRepos - 25;
    //     for(var i = 0; i < removeCount; i++){
    //       user.repos.pop();
    //     }
    //     if(user.repos.length === 0){
    //       repos.pop();
    //     }
    //   }
    // });

    res.send(repos);
  }); 
  
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

