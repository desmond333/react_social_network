import React from 'react'
import s from './Profile.module.css'
import Profile from './Profile'
import {connect} from "react-redux";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator,
    updateUserStatusThunkCreator
} from "./../../redux/profilePageReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from './../../hoc/withAuthRedirect'

class ProfileContainerClass extends React.Component {

    componentDidMount() { //конструирование объекта происходит один единственный раз, но он убивается если меняется url
        let userId = this.props.match.params.userId //эти данные появились с помощью добавления нами параметра в path ProfileContainer
        if (!userId) {
            userId = this.props.autorizedUserId
            userId = 11410

            if (!userId) { // если autorizedUserId = 0 or undefined
                this.props.history.push("/login") //перенаправляем на страницу логина
            }
        }
        this.props.getUserProfileThunk(userId) //вызываем и передаём санке id кликнутого пользователя
        this.props.getUserStatusThunk(userId) //вызываем и передаём санке id кликнутого пользователя
    }

    render() {
        return (
            <div className={s.content}>
                <Profile {...this.props} /*спред оператор = распространение*/
                         profile={this.props.profile}
                         userStatus={this.props.userStatus}
                         updateUserStatusThunk={this.props.updateUserStatusThunk}/>
            </div>
        )
    }
}

//в эту функцию f connect автоматически передаст store.getState()
let mapStateToProps = (state) => {//превращает часть state в props и передает презент. комп.
    return { //f, которая возвращает объект
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        isAuth: state.auth.isAuth,
        autorizedUserId: state.auth.userId,
    }
}

const ProfileContainer = compose(
    connect(mapStateToProps, { //3.) оборачиваем f withRouter в connect и добавляем STATE и  DISPATCH
        getUserProfileThunk: getUserProfileThunkCreator,
        getUserStatusThunk: getUserStatusThunkCreator,
        updateUserStatusThunk: updateUserStatusThunkCreator,
        //создаётся колбэк f => которые внутри себя вызывают creator => которая вызывает thunk => которая диспатчит результат
    }),
    withRouter, // 2.) оборачиваем hoc в f withRouter, которая добавляет url данные
    // withAuthRedirect,  1.) оборачиваем ProfileContainerClass в hoc
)
(ProfileContainerClass)

export default ProfileContainer