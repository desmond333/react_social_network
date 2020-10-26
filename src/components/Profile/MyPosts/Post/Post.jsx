import React from 'react';
import s from './Post.module.css';
import Avatar8 from '../../../../img/Users/Avatar8.jpg';

const Post = (props) => {

    return (
        <div className={s.item}>
            <img src={Avatar8}/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;