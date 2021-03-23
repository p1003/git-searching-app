import React , {FC} from "react"
import { requestUserRepos } from "../../API";

type NavProps = {
    username : string;
    setUsername : (name : string) => void;
    setUserData : (data : any) => void;
}

export const NavBar: FC<NavProps> = props => {

    const onSearchClick = () => {
        props.setUserData(requestUserRepos(props.username));
    }

    return (
        <div>
            <input type="text" value={props.username}
                onChange={e => props.setUsername(e.target.value)}/>
            <button onClick={onSearchClick}>Search</button>
        </div>
    )
}