import React from 'react';
import s from './ProfilePhoto.module.css';
import ProfileSlava from './../../../../img/Profile/ProfileInfo/ProfilePhoto/ProfileSlava.png';


const ProfilePhoto = (props) => {
    return (
        <div className={s.profilePhoto}>
            <img src={ProfileSlava}/>
            <button>EDIT</button>
        </div>
    )
}

export default ProfilePhoto;