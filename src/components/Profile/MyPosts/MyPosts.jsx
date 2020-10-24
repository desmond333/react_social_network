import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import styles from "../../Dialogs/Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "./../../Common components/FormsControl/FormsControl";

const maxLength10 = maxLengthCreator(10)

const AddPostForm = (props) => {
    return (
        <div className={s.postForm}>
            <form onSubmit={props.handleSubmit}> {/*2.) Вызываем переданный снаружи системный метод при отправке формы*/}
                <div>
                    {/*Field это контейнерная компонента из Redux form*/}
                    <Field component={Textarea} name={"newPostText"} placeholder={"Что у вас нового?"}
                           validate={[required, maxLength10]}/>
                </div>
                <button>Опубликовать пост</button>
            </form>
        </div>
    )
}

/*1.1.) здесь есть системный метод handleSubmit, который умеет собирать formData*/
const AddPostFormRedux = reduxForm({ //оборачиваем хоком ReduxForm нашу компоненту DialogsForm
    form: 'postAddTextForm' //уникальное строковое имя для каждой формы, чтобы reduxForm не запутался
})(AddPostForm)

const MyPosts = (props) => {

    console.log("Render MyPosts")

    let postElements = props.postsData
        .map((element,i) => <Post key={i} id={element.id} message={element.message} likesCount={element.likesCount}/>)

    let onAddNewPost = (values) => {
        props.addNewPost(values.newPostText) //newPostText это name компоненты Field
    }

    return (
        <div className={s.myPosts}>
            <div className={s.addPost}>
                <AddPostFormRedux onSubmit={onAddNewPost}/> {/*1.) колбэк f, отдаём ее внутрь для сбора данных формы*/}
            </div>
            <div className={s.postedPosts}>
                <h3>My posts</h3>
                <div className={s.posts}>
                    {postElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts