import { FC, useState } from "react"
import { sortValues, orderValues } from "../../utils"
import styles from "./styles.module.css";
import globalStyles from "../../global.module.css";

type NavProps = {
    setSearchValue: (value: string) => void;
    setPerPage: (value: number) => void;
    setSort: (value: string) => void;
    setOrder: (value: string) => void;
}

type OptionProps = {
    title: string;
    type: string;
    placeholder: string;
    setValue: (value: string) => void;
}

const OptionBar: FC<OptionProps> = props => {
    return (
        <div className={styles.AdvancedOption}>
            <b className={styles.AdvancedB}>{props.title}</b>
            <input className={globalStyles.BasicElement}
                placeholder={props.placeholder}
                type={props.type}
                onChange={e => props.setValue(e.target.value)} />
        </div>
    )
}
// Array.from(Array(100).keys()).map((elem: number) =>
//                                     <option key={elem} value={elem + 1} />)

export const SearchBar: FC<NavProps> = props => {

    const [inputName, setInputName] = useState("");
    const [advanced, setAdvanced] = useState(false);

    return (
        <div className={styles.SearchBar}>
            <div className={styles.BasicSearch}>
                <input className={globalStyles.BasicElement}
                    placeholder="type search value"
                    type="text"
                    onChange={e => setInputName(e.target.value)} />

                <button className={globalStyles.BasicElement} onClick={() => {
                    props.setSearchValue(inputName);
                    setAdvanced(false);
                }}>Search</button>
            </div>
            <button className={globalStyles.BasicElement}
                onClick={() => setAdvanced(!advanced)}>Advanced</button>
            { advanced &&
                <div className={styles.Advanced}>

                    <OptionBar title="Per Page" type="number" placeholder="number from 1 to 100"
                        setValue={value => {
                            const val = parseInt(value);
                            if (val > 0 && val < 101) {
                                props.setPerPage(val);
                            }
                        }} />

                    <OptionBar title="Sort" type="text" placeholder="interactions / reactions / ..."
                        setValue={value => {
                            sortValues.forEach(element => {
                                if (element === value) {
                                    props.setSort(value)
                                }
                            })
                        }} />

                    <OptionBar title="Order" type="text" placeholder="asc / desc"
                        setValue={value => {
                            orderValues.forEach(element => {
                                if (element === value) {
                                    props.setOrder(value)
                                }
                            })
                        }} />

                    <OptionBar title="Stars" type="text" placeholder=">num , <num , num1..num2"
                        setValue={value => {
                            orderValues.forEach(element => {
                                console.log("Implement me ~Stars");
                            })
                        }} />

                    <OptionBar title="Forks" type="text" placeholder=">num , <num , num1..num2"
                        setValue={value => {
                            orderValues.forEach(element => {
                                console.log("Implement me ~Forks");
                            })
                        }} />

                    <OptionBar title="Followers" type="text" placeholder=">num , <num , num1..num2"
                        setValue={value => {
                            orderValues.forEach(element => {
                                console.log("Implement me ~Followers");
                            })
                        }} />
                </div>
            }
        </div>
    )
}