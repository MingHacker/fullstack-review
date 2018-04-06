const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {

  let userRepos;
  
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
    console.log(response.statusCode);
    if(!error && response.statusCode === 200){
      let info = JSON.parse(body);
      userRepos = info;
      console.log('info:', info);
    }
  };

  request(options, callback);
  
}

module.exports.getReposByUsername = getReposByUsername;