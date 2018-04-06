const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', ()=>{
  console.log('Mongo DB Connected!');
});

let repoSchema = mongoose.Schema({
  name: String,
  repo_count: Number,
  repos: [
    {
      repo_name: String,
      url: String,
      description: String,
      forks: Number,
      watchers: Number
    }
  ]
});

let Repo = mongoose.model('Repo', repoSchema);

// repo creation test
let moRepo = new Repo({ 
  name: 'Mo',
  repo_count: 7, 
  repos: [ 
    {
      repo_name: 'hrsf93', 
      url:'http://github.com/2000prcs', 
      description: 'Mo\'s Hack Reactor Github',
      forks: 7777,
      watchers: 777
    }
  ]
});

let save = moRepo.save((err, moRepo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if (err) return console.error(err);
  console.log('Repo saved');
});

Repo.find((err, repos)=>{
  if(err) return console.error(err);
  console.log('repos: ', repos);
});

module.exports.save = save;