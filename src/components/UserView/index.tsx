import React, { FC } from 'react';
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../API";

type UserViewProps = {
    username: string;
}

export const UserView: FC<UserViewProps> = props => {

    const { user } = useParams<{ user: string }>();

    const { data: userData } = useUser(user);

    return (
        <div>
            <Link to="/">Go back</Link>
            { userData &&
                <div>
                    <p>{userData.login}</p>
                    
                    {/* <img src={userData.avatar_url} alt="logo" /> */}
                </div>
            }
        </div>
    )
}