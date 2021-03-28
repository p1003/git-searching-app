import { FC, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useRepo, useRepoData } from "../../API";

export const RepoView: FC = () => {

    const { username } = useParams<{ username: string }>();
    const { repoName } = useParams<{ repoName: string }>();

    const {
        data: repoData,
        isLoading,
        isError
    } = useRepo(username, repoName);
    const { data: repoContributors } = useRepoData(username, repoName, "contributors");
    const { data: repoCommits } = useRepoData(username, repoName, "commits");

    const [view, setView] = useState("");

    return (
        <div>
            <Link to={`/${username}`}>Owner: {username}</Link>
            <p>Repository: {repoName}</p>
            <Link to="/">Searching page</Link>
            { isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div>
                    <button onClick={() => setView("Contributors")}>Contributors</button>
                    <button onClick={() => setView("Commits")}>Commits</button>
                    {view === "Contributors" ?
                        repoContributors?.map((user: any) =>
                            <div key={user.login}>
                                <img src={user.avatar_url} alt="logo" />
                                <Link to={`/${user.login}`}>{user.login}</Link>
                            </div>
                        ) : view === "Commits" &&
                        repoCommits?.map((commit: any) =>
                            <div key={commit.node_id}>
                                <p>{commit.commit.author.name}</p>
                                <p>{commit.commit.message}</p>
                                <p>{commit.commit.author.date}</p>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}