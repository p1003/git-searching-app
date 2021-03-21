import React, {FC, useState} from 'react';
import {requestUserRepos} from "../../API";

type RepoProps = {
    name : string;
    url : string;
}

function Repo (props: RepoProps) {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.url}</p>
        </div>
    )
}

export const MainView: FC = () => {

    const [username, setUsername] = useState("");
    const [data, setData] = useState<null | any>(null);

    const onSearchClick = async () => {
        setData(await requestUserRepos(username));
    };

    function reposList() {
        const list = data.map((repo : any) =>
            <li key={repo.id}>
                <Repo name={repo.name} url={repo.html_url}/>
            </li>
        );
        return (
            <ul>
                {list}
            </ul>
        )
    }

    return (
        <div className="MainView">
            <input type="text" value={username}
                   onChange={e => setUsername(e.target.value)}/>
            <button onClick={onSearchClick}>Search</button>
            {data && reposList()}
        </div>
    )
}