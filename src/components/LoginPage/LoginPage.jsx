import React from 'react' //jsx же транспилируется в js с конструкцией React.createElement - поэтому нужен import React,
// даже если явно в jsx'е нет конструкций с React
import styles from './LoginPage.module.css'
import {Field, reduxForm} from "redux-form";
import {required} from "./../../utils/validators/validators";
import {Input} from "./../Common components/FormsControl/FormsControl";
import {connect} from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return (
        <div className={styles.loginForm}>
            <form onSubmit={props.handleSubmit}> {/*2.) Вызываем переданный снаружи системный метод при отправке формы*/}
                <div>
                    <Field component={Input} validate={[required]}
                           name={"email"} placeholder={"Email"}/> {/*Field это контейнерная компонента из Redux form*/}
                    {/*необходимо указать name ( это то, как будет называться ветка подветки login, являющаяся в свою очередь веткой form)*/}
                </div>
                <div>
                    <Field component={Input} validate={[required]} type={"password"}
                           name={"password"} placeholder={"Password"}/>
                </div>
                <div>
                    <Field component={Input} validate={[required]}
                           name={"rememberMe"} type={"checkbox"}/>
                    <span>Запомнить меня</span>
                </div>
                {props.error && <div className={styles.formSummaryError}>
                    {props.error}
                </div>} {/*показать в случае существования ошибки*/}
                <div>
                    <button>Отправить</button>
                </div>
            </form>
        </div>
    )
}

/*1.1.) здесь есть системный метод handleSubmit, который умеет собирать formData*/
const LoginReduxForm =  reduxForm({ //оборачиваем hoc ReduxForm нашу компоненту LoginForm
    form: 'login' //уникальное строковое имя для каждой формы, чтобы reduxForm не запутался
})(LoginForm)

const LoginPage = (props) => {
    const onSubmit = (formData) => { //1.) колбэк f, отдаём ее внутрь для сбора данных формы
        props.loginThunk(formData.email, formData.password, formData.rememberMe) //передаем в санку данные из формы
    }
    if (props.isAuth) { //если залогинены, переходим на страницу профиля
        return <Redirect to={"/profile"} />
    }
    return (
        <div className={styles.loginPage}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/> {/*1.) колбэк f, отдаём ее внутрь для сбора данных формы*/}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,
    { // вместо mapDispatchToProps = (dispatch) => { return{} }
        loginThunk: loginThunkCreator, //создаётся колбэк f => которая внутри себя вызывает creator =>
        // которая вызывает thunk => которая диспатчит результат
        logoutThunk: logoutThunkCreator,
    })(LoginPage)