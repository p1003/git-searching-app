import { FC, useState } from "react"

type NavProps = {
    setSearchValue: (name: string) => void;
    setSearchType: (name: string) => void;
}

export const NavBar: FC<NavProps> = props => {

    const [inputName, setInputName] = useState("");
    const [type, setType] = useState("repositories");
    const [advanced, setAdvanced] = useState(false);

    const onSearchClick = () => {
        props.setSearchValue(inputName);
        props.setSearchType(type);
    }

    const onTypeClick = () => {
        if (type === "repositories") {
            setType("users");
        } else {
            setType("repositories");
        }
    }
    
    return (
        <div>
            <input type="text"
                onChange={e => setInputName(e.target.value)} />
            <button onClick={onSearchClick}>Search</button>
            <button onClick={onTypeClick}>{type}</button>
            <button onClick={() => setAdvanced(!advanced)}>Advanced</button>
            { advanced &&
                <div>
                    <p>per_page</p>
                    <input list="numbers" />
                    <datalist id="numbers">
                        {
                            Array.from(Array(100).keys()).map((elem: number) =>
                                <option key={elem} value={elem + 1} />)
                        }
                    </datalist>
                    <p>sort</p>
                    <input list="sorts" />
                    <datalist id="sorts">
                        <option value="asc" />
                        <option value="desc" />
                    </datalist>
                </div>
            }
        </div>
    )
}