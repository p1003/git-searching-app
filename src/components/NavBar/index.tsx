import React, { FC, useState } from "react"

type NavProps = {
    setUsername: (name: string) => void;
    refetchUser: () => void;
}

export const NavBar: FC<NavProps> = props => {

    const [inputName, setInputName] = useState("");

    const onSearchClick = () => {
            props.setUsername(inputName);
            props.refetchUser();
    }

    return (
        <div>
            <input type="text" value={inputName}
                onChange={e => setInputName(e.target.value)} />
            <button onClick={onSearchClick}>Search User</button>
        </div>
    )
}