import React, { FC } from 'react';
import { Link, useParams } from "react-router-dom";
import { useRepo } from "../../API";

export const RepoViewRedirect: FC = () => {

    const { user } = useParams<{ user: string }>();
    const { repo } = useParams<{ repo: string }>();

    const { data: repoData } = useRepo(user,repo);

    return (
        <div>
            <Link to="/">Go back</Link>
            { repoData &&
                <div>
                    <p>{repoData.name}</p>
                    
                    {/* <img src={userData.avatar_url} alt="logo" /> */}
                </div>
            }
        </div>
    )
}