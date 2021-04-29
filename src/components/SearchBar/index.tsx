import { FC, useState, Component } from 'react'
import { sortValues, orderValues } from '../../utils'
import styles from './styles.module.css';
import sharedStyles from '../../shared.module.css';

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
        <div className={styles.advanced_option}>
            <b className={styles.advanced_b}>{props.title}</b>
            <input className={`${styles.advanced_input}`}
                placeholder={props.placeholder}
                type={props.type}
                onChange={e => props.setValue(e.target.value)} />
        </div>
    )
}

export const SearchBar: FC<NavProps> = props => {

    const [inputName, setInputName] = useState('');
    const [stars, setStars] = useState('');
    const [forks, setForks] = useState('');
    const [followers, setFollowers] = useState('');
    const [advanced, setAdvanced] = useState(false);

    function isSearchEmpty() {
        return inputName === '' && stars === '' && forks === '' && followers === '';
    }

    function forString(result: string, flatMap: string, type: string): string {
        if (flatMap !== '') {
            if (result !== '') {
                result += '+';
            }
            const list = flatMap.replace(' ', '').split(',');
            const N = list.length;
            for (var i = 0; i < N; i++) {
                result += `${type}%3A${list[i]}`;
                if (i < N - 1) {
                    result += '+';
                }
            }
        }
        return result;
    }

    function searchValue(): string {
        let result = inputName;
        result = forString(result, stars, 'stars');
        result = forString(result, forks, 'forks');
        result = forString(result, followers, 'followers');
        return result;
    }

    return (
        <div className={styles.search_bar}>
            <div className={styles.basic_search}>
                <input className={sharedStyles.BasicElement}
                    placeholder='type search value'
                    type='text'
                    onChange={e => setInputName(e.target.value)} />

                <button className={sharedStyles.BasicElement}
                    onClick={() => {
                        if (!isSearchEmpty()) {
                            props.setSearchValue(searchValue());
                            setAdvanced(false);
                        }
                    }}>Search</button>
            </div>
            <div className={`${styles.advanced} ${!advanced && styles.hidden}`}>

                <b className={styles.advanced_delimiter}>General Options</b>
                <OptionBar title='Per Page' type='number' placeholder='number from 1 to 100'
                    setValue={value => {
                        const val = parseInt(value);
                        if (val > 0 && val < 101) {
                            props.setPerPage(val);
                        }
                    }} />

                <OptionBar title='Sort' type='text' placeholder='interactions / reactions / updated / ...'
                    setValue={value => {
                        sortValues.forEach(element => {
                            if (element === value) {
                                props.setSort(value)
                            }
                        })
                    }} />

                <OptionBar title='Order' type='text' placeholder='asc / desc'
                    setValue={value => {
                        orderValues.forEach(element => {
                            if (element === value) {
                                props.setOrder(value)
                            }
                        })
                    }} />

                <b className={styles.advanced_delimiter}>Repositories Options</b>

                <OptionBar title='Stars' type='text' placeholder='>num , <num , num1..num2'
                    setValue={value => {
                        setStars(value);
                    }} />

                <OptionBar title='Forks' type='text' placeholder='>num , <num , num1..num2'
                    setValue={value => {
                        setForks(value);
                    }} />

                <b className={styles.advanced_delimiter}>Users Options</b>

                <OptionBar title='Followers' type='text' placeholder='>num , <num , num1..num2'
                    setValue={value => {
                        setFollowers(value);
                    }} />
            </div>
            <button className={sharedStyles.BasicElement}
                onClick={() => setAdvanced(!advanced)}>Advanced</button>
        </div>
    )
}