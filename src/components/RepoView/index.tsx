import React, { FC } from 'react';
import { Link } from "react-router-dom";

type RepoViewProps = {
    repoData: any;
}

export const RepoView: FC<RepoViewProps> = props => {

    function collaboratorsList() {
        const list = props.repoData?.map((user: any) =>
            <li key={user.login}>
                <img src={user.avatar} alt="logo" />
                <Link to={`/${user.login}`}>{user.login}</Link>
            </li>
        );
        return (
            <ul>
                {list}
            </ul>
        )
    }

    return (
        <div className="RepoView">
            {props.repoData && collaboratorsList()}
        </div>
    )
}