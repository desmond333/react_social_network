import React from 'react';
import Dialogs from "./Dialogs";
import {sendNewMessageCreator} from "./../../redux/dialogsPageReducer"
//вызываем утилиты, возращающие action для диспатча
import {connect} from "react-redux";
import {compose} from "redux";

//в эту функцию f connect автоматически передаст store.getState()
let mapStateToProps = (state) => {//превращает часть state в props и передает презент. комп.
    return { //f, которая возвращает объект
        dialogsPage: state.dialogsPage,
    }
}

//в эту функцию f connect автоматически передаст store.dispatch.bind(store)
let mapDispatchToProps = (dispatch) => { //отправляет колбэки в нашу презентационную компоненту
    return { //f, которая возвращает объект
        sendNewMessage: (textMessage) => {
            dispatch( sendNewMessageCreator(textMessage) )
        }
    }
}

const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps), //оборачиваем hoc в connect и добавляем STATE и  DISPATCH
)(Dialogs)

export default DialogsContainer;