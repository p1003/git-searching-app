import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import { MainView } from "./components/MainView"
import { NavBar } from "./components/NavBar"
import { RepoView } from './components/RepoView';
import { UserView } from "./components/UserView"

function App() {

    const [username, setUsername] = useState("");
    const [userRepos, setUserData] = useState<null | any>(null);
    const [repoName, setRepoName] = useState("");

    useEffect(() => {
        setRepoName("");
    }, [userRepos]);

    return (
        <div>
            <NavBar username={username} setUsername={setUsername} setUserData={setUserData}/>
            <Switch>
                <Route path="/:user">
                    <UserView />
                </Route>
                <Route>
                    {repoName==="" ?
                    <MainView userRepos={userRepos} setRepoName={setRepoName}/> :
                    <RepoView username={username} repoName={repoName}/>
                    }
                </Route>
            </Switch>
        </div>

    );
}

export default App;
