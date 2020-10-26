import React from 'react';
import s from './Music.module.css';
import {compose} from "redux";
import {withAuthRedirect} from "./../../hoc/withAuthRedirect";


const Music = (props) => {
    return (
        <div className={s.content}>
            Music
        </div>
    )
}

const MusicContainer = compose(
    withAuthRedirect,
)(Music)

export default MusicContainer;