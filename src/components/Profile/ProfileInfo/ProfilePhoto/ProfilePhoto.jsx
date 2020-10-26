import React from 'react';
import styles from './ProfilePhoto.module.css';
import avatar8 from "./../../../../img/Users/Avatar8.jpg";
import avatar7 from "./../../../../img/Users/Avatar7.jpg";
import avatar6 from "./../../../../img/Users/Avatar6.jpg";
import avatar5 from "./../../../../img/Users/Avatar5.jpg";
import avatar4 from "./../../../../img/Users/Avatar4.jpg";
import avatar3 from "./../../../../img/Users/Avatar3.png";
import avatar2 from "./../../../../img/Users/Avatar2.png";
import avatar1 from "./../../../../img/Users/Avatar1.png";


const ProfilePhoto = (props) => {
    const userRandPhoto = () => {
        if(props.userStatus != null){
            return avatar8
        }
        else if(props.userId % 7 === 0){
            return avatar7
        }
        else if(props.userId % 6 === 0){
            return avatar6
        }
        else if(props.userId % 5 === 0){
            return avatar5
        }
        else if(props.userId % 4 === 0){
            return avatar4
        }
        else if(props.userId % 3 === 0){
            return avatar3
        }
        else if(props.userId % 2 === 0){
            return  avatar2
        }
        return avatar1
        console.log(props.userId)
    }
    return (
        <div className={styles.profilePhoto}>
            {/*<img src={props.profile.photos.large || ProfileSlava}/>*/}
            <img src={props.profile.photos.large != null ? props.profile.photos.large : userRandPhoto()}/>
            <button>OPEN PHOTO</button>
        </div>
    )
}

export default ProfilePhoto;