import React from 'react'; //jsx же транспилируется в js с конструкцией React.createElement - поэтому нужен import React, даже если явно в jsx'е нет конструкций с React
import './App.css';
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom"
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/LoginPage/LoginPage";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "./hoc/withAuthRedirect";
import Dialogs from "./components/Dialogs/Dialogs";
import {initializedAppThunkCreator} from "./redux/appReducer";
import Preloader from "./components/Common components/Preloader";

class App extends React.Component {
    componentDidMount() { //конструирование объекта происходит один единственный раз, но он убивается если меняется url
        this.props.initializedAppThunk() //с помощью Thunk -
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div>
                <HeaderContainer/>
                <div className='app-wrapper'>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        {/* Route это компоненты, которые следят за урлом */}
                        {/* В методе render находится функция колбэк, вызывающая компоненты */}
                        <Route
                            path='/profile/:userId?' //подсказываем реакту, добавляя имя параметра и говорим, что он не обязателен(знак ?)
                            render={() => <ProfileContainer/>}/>

                        {/* Route это компоненты, которые следят за урлом */}
                        {/* В методе render находится функция колбэк, вызывающая компоненты */}
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}/>
                        {/*<Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>*/}

                        {/* Route это компоненты, которые следят за урлом */}
                        {/* В методе render находится функция колбэк, вызывающая компоненты */}
                        <Route path='/users'
                               render={() => <UsersContainer/>}/>

                        {/* Route это компоненты, которые следят за урлом */}
                        {/* В методе render находится функция колбэк, вызывающая компоненты */}
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                    </div>
                </div>
            </div>
        );
    }
}

//в эту функцию f connect автоматически передаст store.getState()
let mapStateToProps = (state) => {//превращает часть state в props и передает презент. комп.
    return { //f, которая возвращает объект
        initialized: state.app.initialized,
    }
}

export default compose( //3.)Оборачиваем connect в DialogsContainer
    withRouter, // 2.) оборачиваем App в hoc withRouter
    // 1.) оборачиваем hoc в connect и добавляем STATE и  DISPATCH
    connect(mapStateToProps,
        { // вместо mapDispatchToProps = (dispatch) => { return{} }
            initializedAppThunk: initializedAppThunkCreator, //создаётся колбэк f => которая внутри себя вызывает creator =>
            // которая вызывает thunk => которая диспатчит результат
        }),
)(App)