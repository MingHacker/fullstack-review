import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoListUser = (props) => (
    <div>
        <div id="user">
            <span>[USERNAME: {props.repo.username}] </span><span> [GITHUB URL: <a href={`${props.repo.user_url}`}>{props.repo.user_url}</a>] </span><span> [NO. REPOS: {props.repo.repos.length}]</span>
        </div>
        <table id="customers">
            <thead>
                <tr>
                    <th>Repo URL</th>
                    <th>Description</th>
                    <th>Forks</th>
                    <th>Watchers</th>
                </tr>
            </thead>
            <tbody>
                {props.repo.repos.map((item)=>{
                    return <RepoListItem key={item._id} item={item}/>
                })}
            </tbody>
        </table>
    </div>
);

export default RepoListUser;