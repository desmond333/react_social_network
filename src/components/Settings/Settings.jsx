import React from 'react';
import s from './Settings.module.css';
import {withAuthRedirect} from "./../../hoc/withAuthRedirect";
import {compose} from "redux";


const Settings = (props) => {
    return (
        <div className={s.content}>
            Settings
        </div>
    )
}

const SettingsContainer = compose(
    withAuthRedirect,
)(Settings)

export default SettingsContainer;