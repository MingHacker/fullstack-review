import React from 'react';
import RepoListUser from './RepoListUser.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component: TOP 25 REPOS </h4>
    There are {props.userRepos.length} repos in DB total.
        {props.userRepos.map((repo)=>{
            console.log(repo);
            return <RepoListUser key={repo._id} repo={repo}/>
          })} 
  </div>
)

export default RepoList;