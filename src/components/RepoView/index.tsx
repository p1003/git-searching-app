import React, { FC, useState } from 'react';
import { Link } from "react-router-dom";

type RepoViewProps = {
    repoData: any;
    contributors: any;
    commits: any;
}

export const RepoView: FC<RepoViewProps> = props => {

    const [view, setView] = useState("");

    function onCommitsClick() {
        setView("Commits");
    }
    function onContributorsClick() {
        setView("Contributors");
    }

    function contributorsList() {
        const list = props.contributors?.map((user: any) =>
            <li key={user.login}>
                <img src={user.avatar_url} alt="logo" />
                <Link to={`/${user.login}`}>{user.login}</Link>
            </li>
        );
        return (
            <ul>
                {list}
            </ul>
        )
    }

    function commitsList() {
        const list = props.commits?.map((commit: any) =>
            <li key={commit.node_id}>
                <p>{commit.commiter?.login}</p>
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
            <p>{props.repoData.name}</p>
            <button onClick={onContributorsClick}>Contributors</button>
            <button onClick={onCommitsClick}>Commits</button>
            {view==="Contributors" && contributorsList()}
            {view==="Commits" && commitsList()}
        </div>
    )
}