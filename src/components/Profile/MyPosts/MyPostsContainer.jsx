import React from 'react'
import MyPosts from './MyPosts'
import {addNewPostActionCreator} from "./../../../redux/profilePageReducer";
//вызываем утилиты, возращающие action для диспатча
import {connect} from "react-redux";

//в эту функцию f connect автоматически передаст store.getState()
let mapStateToProps = (state) => {//превращает часть state в props и передает презент. комп.
    return{ //f, которая возвращает объект
        postsData: state.profilePage.postsData,
    }
}

//в эту функцию f connect автоматически передаст store.dispatch.bind(store)
let mapDispatchToProps = (dispatch) => { //отправляет колбэки в нашу презентационную компоненту
    return{ //f, которая возвращает объект
        addNewPost: (newPostText) => {
            dispatch( addNewPostActionCreator(newPostText) )//через диспатч вызываем из store функцию добавления поста
        },
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts) //компоненту Dialogs законектили к store и создали контейнер. комп.


export default MyPostsContainer