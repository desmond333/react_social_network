import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({ //данные для RedirectComponent
    isAuth: state.auth.isAuth, //берём из AuthReducer
})

export const withAuthRedirect = (Component) => { //эта f принимает на входе компоненту

    class RedirectComponent extends React.Component{ //эта компонента снабжает логикой пришедшую компоненту
        render() {
            if(!this.props.isAuth) return <Redirect to={"/login"}/> //если не true (не залогинены) => redirect на страницу логин

            return <Component {...this.props}/> //перерисовываем пришедшую компоненту и передаем ей данные
        }
    }

    let connectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent) //совмещаем данные и классовую компоненту

    return connectedRedirectComponent //возвращаем изменённую пришедшую компоненту, завёрнутую в 2 контейнерные компоненты
}