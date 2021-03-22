import React from "react";

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

export default Repo;