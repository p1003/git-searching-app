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
        refetch
    } = useUserRepos(username);

    const { data: repoData,
    } = useRepo(username, repoName);

    const {
        data: repoContributors
    } = useRepoContributors(username, repoName);

    const {
        data: repoCommits
    } = useRepoCommits(username, repoName);

    return (
        <div>
            <Switch>
                <Route path="/:user">
                    <UserView />
                </Route>
                <Route>
                    <NavBar setUsername={setUsername} refetch={refetch} />
                    <p>username: {username}</p>
                    {username &&
                        <div>
                            {userReposError && (
                                <div>Error! {(userReposError as any).message}</div>
                            )}
                            {repoName!=="" ?
                                <div>
                                    {repoData &&
                                        <RepoView repoData={repoData} contributors={repoContributors} commits={repoCommits}/>
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
