import React from 'react'
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import styles from "../Dialogs/Dialogs.module.css";

const Profile = (props) => {
    return (
        <div className={styles.content}>
            <div className={styles.profile}>
                <ProfileInfo profile={props.profile} userStatus={props.userStatus}
                             updateUserStatusThunk = {props.updateUserStatusThunk}/>
                <MyPostsContainer/>
            </div>
        </div>
    )
}

export default Profile;