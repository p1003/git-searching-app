import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import { MainView } from "./components/MainView"
import { NavBar } from "./components/NavBar"
import { RepoView } from './components/RepoView';
import { UserView } from "./components/UserView"
import { useUserRepos, useRepo } from "./API";

function App() {

    const [username, setUsername] = useState("");
    const [repoName, setRepoName] = useState("");

    useEffect(() => {
        setRepoName("");
    }, [username]);

    const {
        data: userRepos,
        isLoading: isUserReposLoading,
        isError,
        error: userReposError,
        refetch
      } = useUserRepos(username);

    const { data : repoData } = useRepo(username,repoName);

    return (
        <div>
            <NavBar setUsername={setUsername} refetch={refetch} />
            <Switch>
                <Route path="/:user">
                    <UserView />
                </Route>
                <Route>
                    <p>username: {username}</p>
                    {username &&
                        <div>
                            {userRepos ?
                                <MainView userRepos={userRepos} setRepoName={setRepoName} /> :
                                <div>
                                    {repoData &&
                                        <RepoView repoData={repoData} />
                                    }
                                </div>
                            }
                        </div>
                    }
                </Route>
            </Switch>
        </div>

    );
}

export default App;
