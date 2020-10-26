import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "./../../Common components/Preloader";
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";
import ProfileDescription from "./ProfileDescription/ProfileDescription";

const ProfileInfo = (props) => {

    if (!props.profile) { // (props.profile !==0 || props.profile !==undefined)
        return <Preloader/> //сначала даем отрисовать крутилку, а потом уже всё остальное когда придут данные из сервера
    }

    return (
        <div className={s.profileInfo}>
            <ProfilePhoto userStatus={props.userStatus} userId ={props.userId} profile={props.profile}/>
            <ProfileDescription userStatus={props.userStatus} usersData={props.usersData} userId ={props.userId}
                                updateUserStatusThunk={props.updateUserStatusThunk}/>
        </div>
    )
}

export default ProfileInfo;