import {createStore, combineReducers, applyMiddleware} from "redux"
import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";
import usersPageReducer from "./usersPageReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";

let reducers = combineReducers({ //смешиваем все reducer с помощью f combineReducers
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

let store = createStore( reducers, applyMiddleware(thunkMiddleware) ) //автоматически store создает state со свойствами ...Page
//и вклиниваемся в конвейер, создавая промежуточный слой между store.dispatch и reducers

window.store = store

export default store