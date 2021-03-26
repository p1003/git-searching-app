import React, { FC, useState } from 'react';
import { Link } from "react-router-dom";
import { useRepo, useRepoContributors, useRepoCommits } from "../../API";

type RepoViewProps = {
    username: string;
    repoName: string;
}

export const RepoView: FC<RepoViewProps> = props => {

    const { data: repoData,
        error: repoDataError,
        refetch: refetchRepo
    } = useRepo(props.username,props.repoName);

    const { data: repoContributors } = useRepoContributors(props.username, props.repoName);

    const { data: repoCommits } = useRepoCommits(props.username, props.repoName);

    const [view, setView] = useState("Contributors");

    function onCommitsClick() {
        setView("Commits");
    }
    function onContributorsClick() {
        setView("Contributors");
    }

    function contributorsList() {
        const list = repoContributors?.map((user: any) =>
            <li key={user.login}>
                <img src={user.avatar_url} alt="logo" />
                <Link to={`/${user.login}`}>{user.login}</Link>
            </li>
        );
        return (
            <div>
                <p>Contributors</p>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }

    function commitsList() {
        const list = repoCommits?.map((commit: any) =>
            <li key={commit.node_id}>
                <p>{commit.commit.author.name}</p>
                <p>{commit.commit.message}</p>
                <p>{commit.commit.author.date}</p>
            </li>
        );
        return (
            <div>
                <p>Commits</p>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }

    return (
        <div className="RepoView">
            {repoData && <div>
                <p>{repoData?.name}</p>
                <button onClick={onContributorsClick}>Contributors</button>
                <button onClick={onCommitsClick}>Commits</button>
                {view === "Contributors" && contributorsList()}
                {view === "Commits" && commitsList()}
            </div>
            }
        </div>
    )
}