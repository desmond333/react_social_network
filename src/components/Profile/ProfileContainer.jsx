import React from 'react'
import s from './Profile.module.css'
import Profile from './Profile'
import {connect} from "react-redux";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator,
    updateUserStatusThunkCreator
} from "./../../redux/profilePageReducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {getUsersDataSuperSelector} from "./../../redux/usersPageSelectors";

class ProfileContainerClass extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId //эти данные появились с помощью добавления нами параметра в path ProfileContainer
        if (!userId) {
            userId = this.props.authorizedUserId
            userId = 11410
            if (!userId) { // если authorizedUserId = 0 or undefined
                this.props.history.push("/login") //перенаправляем на страницу логина*/
                return <Redirect to={"/login"}/>
            }
        }
        this.props.getUserProfileThunk(userId) //вызываем и передаём санке id кликнутого пользователя
        this.props.getUserStatusThunk(userId) //вызываем и передаём санке id кликнутого пользователя
    }

    componentDidMount() { //конструирование объекта происходит один единственный раз, но он убивается если меняется url
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) { //вызывается сразу же после обновления компоненты
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div className={s.content}>
                <Profile {...this.props} /*спред оператор = распространение*/
                         profile={this.props.profile}
                         userStatus={this.props.userStatus}
                         userId={this.props.match.params.userId}
                         usersData={this.props.usersData}
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
        authorizedUserId: state.auth.userId,
        usersData: getUsersDataSuperSelector(state),
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