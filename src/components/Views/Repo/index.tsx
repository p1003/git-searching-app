import { FC } from 'react';
import { Link } from "react-router-dom";
import styles from "./styles.module.css"
import sharedStyles from "../../../shared.module.css"
import { useFetch } from "../../../API"

type Props = {
    index: number;
    repo: any;
}

export const Repo: FC<Props> = props => {

    const { data: languages } = useFetch(props.repo.languages_url);

    return (
        <div className={`${props.index % 2 === 0 ? sharedStyles.even : sharedStyles.odd}`}>
            <div className={styles.container}>
                <div className={styles.infosection}>
                    <p className={sharedStyles.TitleB}>{props.repo.name}</p>
                    <div className={styles.infoline}>
                        <b className={sharedStyles.plaintext}>Owner:</b>
                        <b className={sharedStyles.plaintext}>{props.repo.owner.login}</b>
                    </div>
                    <div className={styles.infoline}>
                        <b className={sharedStyles.plaintext}>Stars:</b>
                        <b className={sharedStyles.plaintext}>{props.repo.stars}</b>
                    </div>
                    <div className={styles.infoline}>
                        <b className={sharedStyles.plaintext}>Forks:</b>
                        <b className={sharedStyles.plaintext}>{props.repo.forks_count}</b>
                    </div>
                    {languages && Object.keys(languages)[0] &&
                        <div className={styles.infoline}>
                            <b className={sharedStyles.plaintext}>Lang:</b>
                            <b className={sharedStyles.plaintext}>{Object.keys(languages)[0]}</b>
                        </div>}
                </div>
                <div className={styles.btnsection}>
                    <button
                        className={sharedStyles.BasicElement}>
                        <a className={sharedStyles.Link} href={props.repo?.html_url}>View on github</a>
                    </button>
                    <button
                        className={sharedStyles.BasicElement}>
                        <Link className={sharedStyles.Link} to={`/${props.repo.owner.login}/${props.repo.name}`}>More info</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}