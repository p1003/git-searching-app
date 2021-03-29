import { FC, useState } from "react"
import styles from "./styles.module.css";
import { sortValues, orderValues } from "../../utils"

type NavProps = {
    setSearchValue: (name: string) => void;
    setSearchType: (name: string) => void;
    setPerPage: (name: number) => void;
    setSort: (name: string) => void;
    setOrder: (name: string) => void;
}

export const SearchBar: FC<NavProps> = props => {

    const [inputName, setInputName] = useState("");
    const [type, setType] = useState("Repositories");
    const [advanced, setAdvanced] = useState(false);

    return (
        <div className={styles.SearchBar}>
            <div>
                <input className={styles.SearchInput}
                    type="text"
                    onChange={e => setInputName(e.target.value)} />

                <button className={styles.Button} onClick={() => {
                    props.setSearchType(type);
                    props.setSearchValue(inputName);
                }}>Search</button>

                <button className={styles.Button}
                    onClick={() => {
                        if (type === "Repositories") {
                            setType("Users");
                        } else {
                            setType("Repositories");
                        }
                    }}>{type}</button>

                <button className={styles.Button}
                    onClick={() => setAdvanced(!advanced)}>Advanced</button>
            </div>
            { advanced &&
                <div className={styles.Advanced}>
                    <div className={styles.AdvancedOption}>
                        <b className={styles.AdvancedB}>Per Page</b>
                        <input className={styles.AdvancedInput}
                            list="numbers"
                            onChange={e => {
                                const val = parseInt(e.target.value);
                                if (val > 0 && val < 101) {
                                    props.setPerPage(val);
                                }
                            }} />
                        <datalist id="numbers">
                            {
                                Array.from(Array(100).keys()).map((elem: number) =>
                                    <option key={elem} value={elem + 1} />)
                            }
                        </datalist>
                    </div>

                    <div className={styles.AdvancedOption}>
                        <b className={styles.AdvancedB}>Sort</b>
                        <input className={styles.AdvancedInput}
                            list="sorts"
                            onChange={e => {
                                sortValues.forEach(element => {
                                    if (element === e.target.value) {
                                        props.setSort(e.target.value)
                                    }
                                })
                            }} />
                        <datalist id="sorts">
                            {sortValues.map((elem: string) =>
                                <option value={elem} />)}
                        </datalist>
                    </div>

                    <div className={styles.AdvancedOption}>
                        <b className={styles.AdvancedB}>Order</b>
                        <input className={styles.AdvancedInput}
                            list="orders"
                            onChange={e => {
                                orderValues.forEach(element => {
                                    if (element === e.target.value) {
                                        props.setOrder(e.target.value)
                                    }
                                })
                            }} />
                        <datalist id="orders">
                            {orderValues.map((elem: string) =>
                                <option value={elem} />)}
                        </datalist>
                    </div>
                </div>
            }
        </div>
    )
}