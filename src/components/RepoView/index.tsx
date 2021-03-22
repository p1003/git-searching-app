import React, {useEffect, useState} from 'react';
import {requestCollaborators} from "../../API";
import User from "./User";

function RepoView () {

    const [data, setData] = useState<null | any>(null);

    useEffect(() => {
        setData(requestCollaborators("retkiewi","door-manager"));
    }, [data]);

    function collaboratorsList() {
        // const list = data.map((user : any) =>
        //     <li key={user.login}>
        //         <User login={user.login} avatar={user.avatar}/>
        //     </li>
        // );
        return (
            <p>d</p>
            // <ul>
            //     {list}
            // </ul>
        )
    }

    return (
        <div className="RepoView">
            {data && collaboratorsList()}
        </div>
    )
}
export default RepoView;