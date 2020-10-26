import React from 'react';
import styles from './ProfileDescription.module.css';
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileDescription = ({usersData, ...props}) => {
    return (
        <div className={styles.profileDescription}>
            {usersData.map(u => {
                if(props.userId == u.id){
                    return <div>
                        <div className={styles.userName}>{u.name}</div>
                        <div className={styles.userText}>User id: {u.id}</div>
                    </div>
                }
            })}
            <ProfileStatusWithHooks userStatus={props.userStatus}
                           updateUserStatusThunk={props.updateUserStatusThunk}/>
        </div>
    )
}

export default ProfileDescription;