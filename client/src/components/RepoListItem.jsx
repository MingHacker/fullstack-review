import React from 'react';

const RepoListItem = (props) => (

    <tr>
        <td>
            {props.item.repo_url}
        </td>
        <td>
            {props.item.description}
        </td>
        <td>
            {props.item.forks}
        </td>
        <td>
            {props.item.watchers}
        </td>
    </tr>

);

export default RepoListItem;