import React, { FC, useState } from "react"

type NavProps = {
    // setUsername: (name: string) => void;
    // refetchUser: () => void;
    setSearchValue: (name: string) => void;
    setSearchType: (name: string) => void;

}

export const NavBar: FC<NavProps> = props => {

    const [inputName, setInputName] = useState("");
    const [type, setType] = useState("repositories");

    const onSearchClick = () => {
        // props.setUsername(inputName);
        // props.refetchUser();
        props.setSearchValue(inputName);
        props.setSearchType(type);
    }

    const onTypeClick = () => {
        if(type === "repositories") {
            setType("users");
        } else {
            setType("repositories");
        }
    }

    return (
        <div>
            <input type="text" value={inputName}
                onChange={e => setInputName(e.target.value)} />
            <button onClick={onSearchClick}>Search</button>
            <button onClick={onTypeClick}>{type}</button>
        </div>
    )
}