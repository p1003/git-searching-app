import React, { FC, useState } from 'react';

type MainViewProps = {
    userRepos: any;
    setRepoName: (name: string) => void;
}

export const MainView: FC<MainViewProps> = props => {

    const [selectedRepoName, setSelectedRepoName] = useState("");

    const repoClick = (text: string) => {
        console.log(text);
        props.setRepoName(text);
    };
    
    function reposList() {
        const list = props.userRepos?.map((repo: any) =>
            <li key={repo.id}>
                <p onClick={() => repoClick(repo.name)}>{repo.name}</p>
                <p>{repo.html_url}</p>
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
            {props.userRepos && reposList()}
        </div>
    )
}