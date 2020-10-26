import React from 'react';
import s from './Friends.module.css';
import {compose} from "redux";
import {withAuthRedirect} from "./../../hoc/withAuthRedirect";

const Friends = (props) => {
    return (
        <div className={s.content}>
            Friends
        </div>
    )
}

const FriendsContainer = compose(
    withAuthRedirect,
)(Friends)

export default FriendsContainer;