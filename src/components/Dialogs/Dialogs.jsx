import React from 'react';
import styles from './Dialogs.module.css';
import DialogUser from "./DialogUser/DialogUser";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "./../../utils/validators/validators";
import {Textarea} from "./../Common components/FormsControl/FormsControl";

const maxLength50 = maxLengthCreator(50)
const AddMessageForm = (props) => {
    return (
        <div className={styles.dialogsForm}>
            <form onSubmit={props.handleSubmit}> {/*2.) Вызываем переданный снаружи системный метод при отправке формы*/}
                <div>
                    {/*Field это контейнерная компонента из Redux form*/}
                    <Field component={Textarea} validate={[maxLength50, required]}
                           name={"textMessage"} placeholder="Оставьте сообщение как аноним" className={styles.textArea}/>
                </div>
                <div className={styles.sendButton}>
                    <button>send message</button>
                </div>
            </form>
        </div>
    )
}

/*1.1.) здесь есть системный метод handleSubmit, который умеет собирать formData*/
const AddMessageFormRedux = reduxForm({ //оборачиваем хоком ReduxForm нашу компоненту DialogsForm
    form: 'dialogAddMessageForm' //уникальное строковое имя для каждой формы, чтобы reduxForm не запутался
})(AddMessageForm)

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogUserElements = state.dialogDataUsers
        .map((element, i) => <DialogUser key={i} userName={element.userName} id={element.id}/>)

    let messagesElements = state.messagesData
        .map((element, i) => <Message key={i} id={element.id} message={element.message}/>)

    let addNewMessage = (values) => {
        props.sendNewMessage(values.textMessage) //textMessage это name компоненты Field
    }

    return (
        <div className={styles.content}>

            <div className={styles.dialogs}>

                <div className={styles.dialogUsers}>
                    {dialogUserElements}
                </div>

                <div className={styles.messages}>

                    <div>{messagesElements}</div>

                    <AddMessageFormRedux onSubmit={addNewMessage}/> {/*1.) колбэк f, отдаём ее внутрь для сбора данных формы*/}

                </div>

            </div>
        </div>
    )
}

export default Dialogs;