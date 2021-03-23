import React, {FC} from "react";

type RepoProps = {
    name : string;
    url : string;
    clickHandler : (text : string) => void;
}

export const Repo: FC<RepoProps> = props => {
    return (
        <div>
            <p onClick={() => props.clickHandler(props.name)}>{props.name}</p>
            <p>{props.url}</p>
        </div>
    )
}