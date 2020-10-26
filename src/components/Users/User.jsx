import React from 'react'
import avatar1 from "./../../img/Users/Avatar1.png";
import avatar2 from "./../../img/Users/Avatar2.png";
import avatar3 from "./../../img/Users/Avatar3.png";
import avatar4 from "./../../img/Users/Avatar4.jpg";
import avatar5 from "./../../img/Users/Avatar5.jpg";
import avatar6 from "./../../img/Users/Avatar6.jpg";
import avatar7 from "./../../img/Users/Avatar7.jpg";
import avatar8 from "./../../img/Users/Avatar8.jpg";
import {NavLink} from "react-router-dom";
import styles from './User.module.css'

let User = ({user, followingInProgress, unfollowThunk, followThunk}) => {
    const noStatus = () => {
        return (
            <span className={styles.noStatus}>no status</span>
        )
    }
    const userRandPhoto = () => {
        if(user.status != null){
            return avatar8
        }
        else if(user.id % 7 === 0){
            return avatar7
        }
        else if(user.id % 6 === 0){
            return avatar6
        }
        else if(user.id % 5 === 0){
            return avatar5
        }
        else if(user.id % 4 === 0){
            return avatar4
        }
        else if(user.id % 3 === 0){
           return avatar3
        }
        else if(user.id % 2 === 0){
            return  avatar2
        }
        return avatar1
    }
    return (
        <div className={styles.user}>
            <div className={styles.userPhoto}>
                <img src={user.photos.small != null ? user.photos.small : userRandPhoto()}
                         className={styles.userPhoto}/>
            </div>

            <div className={styles.userDescription}>
                    <span>
                        <div className={styles.userName}>{user.name}</div>
                        <span className={styles.userText}>Status: {user.status != null ? user.status : noStatus()} </span>
                        <span className={styles.userText}>User id: {user.id}</span>
                    </span>
            </div>

            <div className={styles.buttonsArea}>
                {user.followed
                    ? <button disabled={followingInProgress
                        .some(id => id === user.id)}
                              onClick={() => {
                                  unfollowThunk(user.id)
                              }}>
                        Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  followThunk(user.id)
                              }}>
                        Follow</button>}
                <div className={styles.buttonGoToArea}>
                    <NavLink to={'/profile/' + user.id}>
                        <button>Go to user page</button>
                    </NavLink>
                </div>
            </div>

        </div>)
}

export default User;