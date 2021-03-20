import React from "react";

type RepoProps = {
    name : string;

}

function Repo (props: RepoProps) {
    return (
        <div>
            <p>{props.name}</p>
        </div>
    )
}

export default Repo;