import React from 'react';
import RepoListUser from './RepoListUser.jsx';

const RepoList = (props) => (
  <div>
    <h3 id="count"> ### {props.userRepos.length} users on the list total ###</h3>
    <h4> TOP 25 REPOS (sorted by recently added)</h4>
        {props.userRepos.map((repo)=>{
            console.log(repo);
            return <RepoListUser key={repo._id} repo={repo}/>
          })} 
  </div>
)

export default RepoList;