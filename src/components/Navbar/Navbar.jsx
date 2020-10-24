import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import ItemIconProfile from './../../img/Navbar/ItemIconProfile.png';
import ItemIconMessages from './../../img/Navbar/ItemIconMessages.png';
import ItemIconUsers from './../../img/Navbar/ItemIconUsers.png';
import ItemIconNews from './../../img/Navbar/ItemIconNews.png';
import ItemIconMusic from './../../img/Navbar/ItemIconMusic.png';
import ItemIconSettings from './../../img/Navbar/ItemIconSettings.png';
import ItemIconUser from "../../img/Dialogs/ItemIconUser.png";
import FriendsIcon1 from "../../img/Navbar/friendNaruto.png";
import FriendsIcon2 from "../../img/Navbar/friendMrWhite.png";
import FriendsIcon3 from "../../img/Navbar/friendVeider.png";
import FriendsIcon4 from "../../img/Navbar/friendIronMan.png";

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <img className={s.itemIcon} src={ItemIconProfile}/>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
                {/* Navlink меняет url в браузере без перезагрузки */}
            </div>
            <div className={s.item}>
                <img className={s.itemIcon} src={ItemIconMessages}/>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
                {/* Navlink меняет url в браузере без перезагрузки */}
            </div>
            <div className={s.item}>
                <img className={s.itemIcon} src={ItemIconNews}/>
                <a href="/news">News</a>
            </div>
            <div className={s.item}>
                <img className={s.itemIcon} src={ItemIconMusic}/>
                <a href="/music">Music</a>
            </div>
            <div className={s.item}>
                <img className={s.itemIcon} src={ItemIconUsers}/>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
                {/* Navlink меняет url в браузере без перезагрузки */}
            </div>
            <div className={s.item}>
                <img className={s.itemIcon} src={ItemIconSettings}/>
                <a href="/settings">Settings</a>
            </div>
            <div className={s.friends}>
                <a href="/friends">My friends</a>
                <img className={s.friendsIcon} src={FriendsIcon1}/>
                <img className={s.friendsIcon} src={FriendsIcon2}/>
                <img className={s.friendsIcon} src={FriendsIcon3}/>
                <img className={s.friendsIcon} src={FriendsIcon4}/>
            </div>
        </nav>
    )
}

export default Navbar;