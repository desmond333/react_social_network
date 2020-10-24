import React from 'react';
import styles from './Header.module.css';
import myNetworkName from './../../img/Header/MyNetworkName.svg'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={styles.header}>
            {/*<h1>SOCIAL NETWORK</h1>*/}
            <img className={styles.mainTitle} src={myNetworkName}/>
            <div className={styles.loginBlock}>
                {props.isAuth ?
                    <div className={styles.loginBlockIsAuthTrue}>
                        <p>{props.login}</p>
                        <button onClick={props.logoutThunk}>Выйти</button>
                    </div>
                    :
                    <div className={styles.loginBlockIsAuthFalse}>
                        <NavLink to="/login">
                            <p>Login</p>
                        </NavLink>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header;