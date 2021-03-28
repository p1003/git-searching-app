import { FC, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useUser, useUserData } from "../../API";

export const UserView: FC = () => {

    const { username } = useParams<{ username: string }>();

    const {
        data: userData,
        isLoading,
        isError
    } = useUser(username);

    const { data: userRepos } = useUserData(username, "repos");
    const { data: userFollowers } = useUserData(username, "followers");

    const [view, setView] = useState("");

    return (
        <div>
            <Link to="/">Searching page</Link>
            { isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div>
                    <p>{userData?.login}</p>
                    <button onClick={() => setView("Repositories")}>Repositories</button>
                    <button onClick={() => setView("Followers")}>Followers</button>
                    {view === "Repositories" ?
                        userRepos?.map((repo: any) =>
                            <div key={repo.id}>
                                <a href={repo?.html_url}>View on github</a>
                                <p>Author: {repo.owner.login}</p>
                                <p>Repo name: {repo.name}</p>
                                <Link to={`/${repo.owner.login}/${repo.name}`}>More info</Link>
                            </div>
                        ) : view === "Followers" &&
                        userFollowers?.map((user: any) =>
                            <div key={user.login}>
                                <img src={user.avatar_url} alt="logo" />
                                <Link to={`/${user.login}`}>{user.login}</Link>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}