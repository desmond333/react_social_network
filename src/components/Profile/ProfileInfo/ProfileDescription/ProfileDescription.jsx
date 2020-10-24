import React from 'react';
import s from './ProfileDescription.module.css';
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileDescription = (props) => {
    return (
        <div className={s.profileDescription}>
            <h3>description</h3>
            <ProfileStatusWithHooks userStatus={props.userStatus}
                           updateUserStatusThunk={props.updateUserStatusThunk}/>
            <img src={props.profile.photos.large}/>
        </div>
    )
}

export default ProfileDescription;