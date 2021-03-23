import React, {useEffect, useState, FC} from 'react';
import {requestRepo} from "../../API";
import {User} from "../User";

type RepoViewProps = {
    username : string;
    repoName : string;
}

export const RepoView: FC<RepoViewProps> = props => {

    const [data, setData] = useState<null | any>(null);

    useEffect(() => {
        // setData(requestRepo(props.username,props.repoName));
    }, [data]);

    function collaboratorsList() {
        const list = data.map((user : any) =>
            <li key={user.login}>
                <User login={user.login} avatar={user.avatar}/>
            </li>
        );
        return (
            <ul>
                {list}
            </ul>
        )
    }

    return (
        <div className="RepoView">
            <p>{props.username}</p>
            <p>{props.repoName}</p>
            {data && collaboratorsList()}
        </div>
    )
}