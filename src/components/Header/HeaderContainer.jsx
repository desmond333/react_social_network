import React from 'react'
import Header from './Header'
import {logoutThunkCreator} from "./../../redux/authReducer";
import {connect} from "react-redux";
import Preloader from "./../Common components/Preloader";

class HeaderContainer extends React.Component {
    render() {
        return <> {/*чтобы не создавать настоящую разметку для элементов, делаем fake заглушку*/}
            {
                this.props.isFetching ? <Preloader/> : null //тернарный оператор
            }
            <Header {...this.props}/> {/*спред оператор = распространение*/}
        </>
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps,
    { // вместо mapDispatchToProps = (dispatch) => { return{} }
        logoutThunk: logoutThunkCreator, //создаётся колбэк f => которая внутри себя вызывает creator =>
        // которая вызывает thunk => которая диспатчит результат
    })(HeaderContainer)
