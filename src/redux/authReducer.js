import {authAPI} from "./../api/api";
import {stopSubmit} from "redux-form";

let SET_USER_AUTH_DATA = "authReducer/SET_USER_AUTH_DATA" //используем константы, чтобы не опечататься в строках
let TOGGLE_IS_FETCHING = "authReducer/TOGGLE_IS_FETCHING"

let initialState = { //если подчасть state не приходит в reducer, то используем эту подчасть state по умолчанию
    userId: null,
    login: null,
    email: null,
    isFetching: false, //запрос ПОСЫЛАЕТСЯ?
    isAuth: false, //залогинены?
}

const authReducer = (state = initialState, action) => {
    switch (action.type) { //реагируем на приходящие action

        case SET_USER_AUTH_DATA:
            return { //создаём и сразу возвращаем
                ...state,
                ...action.payload, //эти данные перезатрут данные из state
            } //сделали глубокую копию state

        case TOGGLE_IS_FETCHING:
            return { //создаём и сразу возвращаем
                ...state,
                isFetching: action.isFetching, //передаёт в initialState инфу о подгрузке
            }

        default:
            return state
    }
}

export const setUserAuthDataAC = (userId, email, login, isAuth) => ({
    type: SET_USER_AUTH_DATA, payload:
        {userId, email, login, isAuth}
});

export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})//передаёт action.type

export const getAuthUserThunkCreator = () => { //эту f вызывают, чтобы получить санку getAuthUserThunk,
    // которая сможет достучаться до передаваемых параметров
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators

        dispatch(toggleIsFetchingAC(true)) // активируем preloader в начале запроса

        let data = await authAPI.me() //делаем get запрос в файле api.js
        if (data.resultCode === 0) { //если мы залогинены
            let {userId, login, email} = data.data;
            dispatch(setUserAuthDataAC(userId, email, login, true)) //то передаем данные в reducer

            dispatch(toggleIsFetchingAC(false)) // выключаем preloader в конце запроса
        }
    }
}

export const loginThunkCreator = (email, password, rememberMe) => { //эту f вызывают, чтобы получить санку loginThunk,
    // которая сможет достучаться до передаваемых параметров
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators
        let data = await authAPI.login(email, password, rememberMe) //делаем post запрос в файле api.js
        if (data.resultCode === 0) { //если мы залогинены
            dispatch(getAuthUserThunkCreator()) //то вызываем креатор санки getAuthUserThunk
        } else {
            let messageError = (data.messages.length > 0) ? data.messages[0] : 'какая-то ошибка :(' //проверка
            dispatch(stopSubmit("login", {_error: messageError})) //вызываем системный креатор
            // и вторым параметром передаем имя филда, который отвечает за отображение ошибки
        }
    }
}

export const logoutThunkCreator = () => { //эту f вызывают, чтобы получить санку logoutThunk,
    // которая сможет достучаться до передаваемых параметров
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators
        let data = await authAPI.logout() //делаем delete запрос в файле api.js
        if (data.resultCode === 0) { //если мы залогинены
            //когда мы вылогиниваемся, нам нужно занулить всё, что мы знали о себе
            dispatch(setUserAuthDataAC(null, null, null, false))
        }
    }
}

export default authReducer