import React from 'react';
import s from './Post.module.css';
import ProfileSlava from '../../../../img/Profile/MyPosts/Post/ProfileSlava.png';

const Post = (props) => {

  return (
    <div className={s.item}>
      <img src={ProfileSlava} />
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;