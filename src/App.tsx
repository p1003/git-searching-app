import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import { MainView } from "./components/MainView"
import { NavBar } from "./components/NavBar"
import { RepoView } from './components/RepoView';
import { UserView } from "./components/UserView"
import { useUserRepos, useRepo, useRepoContributors, useRepoCommits } from "./API";

function App() {

    const [username, setUsername] = useState("");
    const [repoName, setRepoName] = useState("");

    useEffect(() => {
        setRepoName("");
    }, [username]);

    const {
        data: userRepos,
        error: userReposError,
        refetch: refetchUser
    } = useUserRepos(username);

    return (
        <div>
            <Switch>
                <Route path="/:user">
                    <UserView username={username}/>
                </Route>
                <Route>
                    <NavBar setUsername={setUsername} refetchUser={refetchUser}/>
                    {repoName!=="" && <button onClick={() => setRepoName("")}>Back to repo list</button>}
                    {username &&
                        <div>
                            <p>username: {username}</p>
                            {userReposError && (
                                <div>Error! {(userReposError as any).message}</div>
                            )}
                            {repoName!=="" ?
                                <div>
                                    {repoName &&
                                        <RepoView username={username} repoName={repoName}/>
                                    }
                                </div> :
                                <MainView userRepos={userRepos} setRepoName={setRepoName} />
                            }
                        </div>
                    }
                </Route>
            </Switch>
        </div>

    );
}

export default App;
