import React, {FC} from "react";
import { Link } from "react-router-dom";

type UserProps = {
    avatar: string;
    login: string;
}

export const User: FC<UserProps> = props => {
    return (
        <div>
            <img src={props.avatar} alt="logo"/>
            <Link to={`/${props.login}`}>{props.login}</Link>
        </div>
    )
}