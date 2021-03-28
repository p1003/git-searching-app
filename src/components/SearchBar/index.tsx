import { FC, useState } from "react"
import styles from "./styles.module.css";

type NavProps = {
    setSearchValue: (name: string) => void;
    setSearchType: (name: string) => void;
    setPerPage: (name: number) => void;
    setSort: (name: string) => void;
    setOrder: (name: string) => void;
}

export const SearchBar: FC<NavProps> = props => {

    const [inputName, setInputName] = useState("");
    const [type, setType] = useState("repositories");
    const [advanced, setAdvanced] = useState(false);

    return (
        <div className={styles.SearchBar}>
            <input className={styles.Input}
                type="text"
                onChange={e => setInputName(e.target.value)} />

            <button className={styles.Button} onClick={() => {
                if (!advanced) {
                    props.setPerPage(30);
                    props.setSort("");
                    props.setOrder("");
                }
                props.setSearchType(type);
                props.setSearchValue(inputName);
            }}>Search</button>

            <button className={styles.Button}
            onClick={() => {
                if (type === "repositories") {
                    setType("users");
                } else {
                    setType("repositories");
                }
            }}>{type}</button>

            <button className={styles.Button}
            onClick={() => setAdvanced(!advanced)}>Advanced</button>
            { advanced &&
                <div>
                    <text>per_page</text>
                    <input list="numbers" onChange={e => props.setPerPage(parseInt(e.target.value))} />
                    <datalist id="numbers">
                        {
                            Array.from(Array(100).keys()).map((elem: number) =>
                                <option key={elem} value={elem + 1} />)
                        }
                    </datalist>
                    <text>sort</text>
                    <input list="sorts" onChange={e => props.setSort(e.target.value)} />
                    <datalist id="sorts">
                        <option value="interactions" />
                        <option value="reactions" />
                        <option value="author-date" />
                        <option value="commiter-date" />
                        <option value="updated" />
                    </datalist>
                    <text>order</text>
                    <input list="orders" onChange={e => props.setOrder(e.target.value)} />
                    <datalist id="orders">
                        <option value="asc" />
                        <option value="desc" />
                    </datalist>
                </div>
            }
        </div>
    )
}