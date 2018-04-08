const mongoose = require('mongoose');
const mongoUrl = process.env.MONGOLAB_URI;
mongoose.connect(mongoUrl);
//mongoose.connect('mongodb://localhost/fetcher' || mongoUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', ()=>{
  console.log('Mongo DB Connected!');
});

let repoSchema = mongoose.Schema({
  username: String,
  repo_count: Number,
  user_url: String,
  repos: [
    {
      repo_url: String, 
      description: String, 
      forks: Number,
      watchers: Number,
    }
  ]
});

let Repo = mongoose.model('Repo', repoSchema);

// repo creation test
let moRepo = new Repo({ 
  username: 'Mo',
  repo_count: 7, 
  user_url: '',
  repos: [
    {
      repo_url:'http://github.com/2000prcs', 
      description: 'Mo\'s Hack Reactor Github',
      forks: 7777,
      watchers: 777
    }
  ]
});


let save = (info) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let newRepos = [];
  info.forEach((repo)=>{
    let eachRepo = {};
    eachRepo.repo_url = repo.html_url;
    eachRepo.description = repo.description;
    eachRepo.forks = repo.forks;
    eachRepo.watchers = repo.watchers;
    newRepos.push(eachRepo); 
  })
  console.log('newRepos:', newRepos);

  // create each repo to save one by one 
  // console.log('Info from server:', info);
    let user = new Repo({
      username: info[0].owner.login,
      repo_count: info.length,
      user_url: info[0].owner.html_url,
      repos: newRepos
    });

    console.log('user: ', user);

  Repo.findOneAndUpdate({username: info[0].owner.login}, /* query to find a unique match */ user, /* the instance I want to update */ 
    {upsert: true}, /* create if it doesn't exist */ (err, doc)=>{    
    if (err) return console.error(err);
    console.log('Repo saved, doc:', doc);
  })

};

// find all info from DB 
let find = function(callback) {
  Repo.find((err, repos)=>{
  if(err) return console.error(err);
  console.log('repos: ', repos);
  callback(repos);
  });
}


module.exports.save = save;
module.exports.find = find;
