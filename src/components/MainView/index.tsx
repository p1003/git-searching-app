import React, {FC, useState} from 'react';
import {RequestUserRepos} from "../../API";
import {Repo} from "../Repo";
import { RepoView } from '../RepoView';

export const MainView: FC = () => {


    const [username, setUsername] = useState("");
    const [data, setData] = useState<null | any>(null);
    const [repoName, setRepoName] = useState<null | any>(null);

    const onSearchClick = async () => {
        setRepoName(null);
        setData(RequestUserRepos(username));
    };

    const repoClick = (text: string) => {
        console.log(text);
        setRepoName(text);
    };

    function reposList() {
        const list = data.map((repo : any) =>
            <li key={repo.id}>
                <Repo name={repo.name} url={repo.html_url} clickHandler={repoClick}/>
            </li>
        );
        return (
            <ul>
                {list}
            </ul>
        )
    };

    return (
        <div className="MainView">
            <input type="text" value={username}
                onChange={e => setUsername(e.target.value)}/>
            <button onClick={onSearchClick}>Search</button>
            {repoName ? 
                <RepoView username={username} repoName={repoName}/> 
            : 
            <div>
                {data && reposList()}
            </div>
            }
        </div>
    )
}