import React from 'react'
import {connect} from "react-redux"
import Users from './Users'
import Preloader from './../Common components/Preloader'
import {
    setCurrentPageAC,
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
} from "./../../redux/usersPageReducer"
import {compose} from "redux";
import {
    getUsersDataSuperSelector,
    getCurrentPageSelector,
    getDisplayUsersNumberSelector,
    getFollowingInProgressSelector,
    getIsFetchingSelector,
    getTotalUsersCountSelector,
} from "./../../redux/usersPageSelectors"

//вызываем утилиты, возращающие action для диспатча

class UsersContainerClass extends React.Component {

    componentDidMount() { //конструирование объекта происходит один единственный раз, но он убивается если меняется url

        this.props.getUsersThunk(this.props.currentPage, this.props.displayUsersNumber) //вызываем и передаём санке параметры
    }

    onPageChanged = (currentPage) => { //локальный метод для обработчика событий OnClick

        this.props.setCurrentPage(currentPage) // получаем актуальную страницу

        this.props.getUsersThunk(currentPage, this.props.displayUsersNumber) //вызываем и передаём санке параметры
    }

    render() { //передаём через props все нужные данные нашей презентационной компоненте
        return <> {/*чтобы не создавать настоящую разметку для элементов, делаем fake заглушку*/}
            {
                this.props.isFetching ? <Preloader/> : null //тернарный оператор
            }
            <Users totalUsersCount={this.props.totalUsersCount}
                   displayUsersNumber={this.props.displayUsersNumber}
                   currentPage={this.props.currentPage}
                   usersData={this.props.usersData}
                   followingInProgress={this.props.followingInProgress}

                   unfollowThunk={this.props.unfollowThunk}
                   followThunk={this.props.followThunk}
                   onPageChanged={this.onPageChanged}
            />
        </>
    }
}

//в эту функцию f connect автоматически передаст store.getState()
let mapStateToProps = (state) => {//превращает часть state в props и передает презент. комп.
    return { //f, которая возвращает объект
        usersData: getUsersDataSuperSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        displayUsersNumber: getDisplayUsersNumberSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
    }
}


const UsersContainer = compose( //3.)Оборачиваем connect в UsersContainer
    connect(mapStateToProps, // 2.) оборачиваем hoc в connect и добавляем STATE и  DISPATCH
    { // вместо mapDispatchToProps = (dispatch) => { return{} }
        setCurrentPage: setCurrentPageAC, //коннект автоматически передаст параметр этой f, тоже самое и у других
        getUsersThunk: getUsersThunkCreator, //создаётся колбэк f => которая внутри себя вызывает creator =>
        // которая вызывыает thunk => которая диспатчит результат
        unfollowThunk: unfollowThunkCreator, //создаётся колбэк f => которая внутри себя вызывает creator =>
        // которая вызывыает thunk => которая диспатчит результат
        followThunk: followThunkCreator, //создаётся колбэк f => которая внутри себя вызывает creator =>
        // которая вызывыает thunk => которая диспатчит результат
    }),
    /*withAuthRedirect, // 1.) оборачиваем UsersContainerClass в hoc*/
)
(UsersContainerClass)

export default UsersContainer
