import React from "react";

type UserProps = {
    avatar: string;
    login: string;
}

function User(props: UserProps) {
    return (
        <div>
            <p>{props.login}</p>
            <img src={props.avatar} alt="logo"/>
        </div>
    )
}

export default User;