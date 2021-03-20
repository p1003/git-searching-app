import React, {useState} from 'react';
import {requestUser, requestUserRepos} from "./API";
import User from "./components/User";
import Repo from "./components/Repo";

function App() {

    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState<null | any>(null);
    const [userReposData, setUserReposData] = useState<null | any>(null);

    const onSearchClick = async () => {
        setUserData(await requestUser(username));
    };

    const onReposClick = async () => {
        setUserReposData(await requestUserRepos(username));
    }

    function reposList() {
        const list = userReposData.map((repo : any) =>
            <li key={repo.id}>
                <Repo name={repo.name}/>
            </li>
        );
        return (
            <ul>
                {list}
            </ul>
        )
    }
    return (
        <div className="App">
            <input type="text" value={username}
                onChange={e => setUsername(e.target.value)}/>
            <button onClick={onSearchClick}>Search</button>
            {userData &&
            <div>
                <User login={userData.login} avatar={userData.avatar_url}/>
                <p onClick={onReposClick}>Repos</p>
                {userReposData && reposList()}
            </div>}
        </div>
    );
}

export default App;
