import React from 'react';
import RepoListUser from './RepoListUser.jsx';

const RepoList = (props) => (
  <div>
    <h3 id="count"> ### There are {props.userRepos.length} repos in DB total ###</h3>
    <h4> TOP 25 REPOS </h4>
        {props.userRepos.map((repo)=>{
            console.log(repo);
            return <RepoListUser key={repo._id} repo={repo}/>
          })} 
  </div>
)

export default RepoList;