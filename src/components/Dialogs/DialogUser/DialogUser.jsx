import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

import ItemIconUser from './../../../img/Dialogs/ItemIconUser.png';

const DialogUser = (props) => {
    return (
        <div className={s.dialogUser}>
            <img className={s.dialogUserIcon} src={ItemIconUser}/>
            <NavLink to={"/dialogs/" + props.id}> {props.userName} </NavLink>
        </div>
    )
}

export default DialogUser;