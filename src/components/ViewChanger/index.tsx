import { FC } from "react"
import styles from "./styles.module.css";

type ViewChangerProps = {
    setView: (view: string) => void;
    view1: string;
    view2: string;
    selectedView: string;
}

export const ViewChanger: FC<ViewChangerProps> = props => {
    return (
        <div className={styles.ViewChanger}>
            <button
            className={props.selectedView === props.view1 ? styles.SelectedBtn : styles.NormalBtn}
                onClick={() => { props.setView(props.view1) }}>
                {props.view1}
                </button>
            <button
            className={props.selectedView === props.view2 ? styles.SelectedBtn : styles.NormalBtn}
                onClick={() => { props.setView(props.view2) }}>
                {props.view2}
                </button>
        </div>
    )
}