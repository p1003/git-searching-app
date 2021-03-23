import React, {FC, useState} from 'react';
import {Repo} from "../Repo";

type MainViewProps = {
    userRepos : any;
    setRepoName : (name : string) => void;
}

export const MainView: FC<MainViewProps> = props => {

    const repoClick = (text: string) => {
        props.setRepoName(text);
    };

    function reposList() {
        console.log(props.userRepos);
        const list = props.userRepos.map((repo : any) =>
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
            {props.userRepos && reposList()}
        </div>
    )
}