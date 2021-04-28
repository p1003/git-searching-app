import { FC } from 'react';
import { Link } from "react-router-dom";
import styles from "./styles.module.css"
import sharedStyles from "../../../shared.module.css"

type Props = {
    index: number;
    user: any;
}

export const User: FC<Props> = props => {
    return (
        <div className={`${props.index % 2 === 0 ? sharedStyles.even : sharedStyles.odd} ${sharedStyles.resultBar}`}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <img className={sharedStyles.UserImage} src={props.user.avatar_url} alt="logo" />
                    <b className={sharedStyles.TitleB}>{props.user.login}</b>
                </div>
                <div className={styles.section}>
                    <button
                        className={sharedStyles.BasicElement}>
                        <a className={sharedStyles.Link} href={props.user.html_url}>View on Github</a>
                    </button>
                    <button
                        className={sharedStyles.BasicElement}>
                        <Link className={sharedStyles.Link} to={`/${props.user.login}`}>More info</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}