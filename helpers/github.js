const request = require('request');
const config = require('../config.js');

let db = require('../database/index.js');

let getReposByUsername = (username) => {
  
  console.log('username: ', username);
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  let options = {
    url: 'https://api.github.com/users' + '/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let callback = (error, response, body) => {
    console.log('statuscode: ', response.statusCode);
    if(!error && response.statusCode === 200){
      let info = JSON.parse(body);
      // save the repo information in the database
      console.log('Info from github:', info);
      if(info.length > 0){
        db.save(info); 
      } else {
        console.log('No Public Repos for the User');
      }
    }
  };

  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;