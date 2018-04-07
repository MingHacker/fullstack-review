import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoListUser = (props) => (
    <div>
        <div id="user">
            <span>[Username: {props.repo.username}] </span><span> [Github URL: {props.repo.user_url}] </span><span> [No. Repos: {props.repo.repos.length}]</span>
        </div>
        <table>
            <tbody>
                <tr>
                    <th>Repo URL</th>
                    <th>Description</th>
                    <th>Forks</th>
                    <th>Watchers</th>
                </tr>
                {props.repo.repos.map((item)=>{
                    return <RepoListItem key={item._id} item={item}/>
                })}
            </tbody>
        </table>
    </div>
);

export default RepoListUser;