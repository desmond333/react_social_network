import {profileAPI} from "./../api/api";

let ADD_NEW_POST = "profilePageReducer/ADD_NEW_POST" //используем константы, чтобы не опечататься в строках
let DELETE_POST = "profilePageReducer/DELETE_POST" //используем константы, чтобы не опечататься в строках

let SET_USER_PROFILE = "profilePageReducer/SET_USER_PROFILE"
let SET_USER_STATUS = "profilePageReducer/SET_USER_STATUS"

let initialState = { //если подчасть state не приходит в reducer, то используем эту подчасть state по умолчанию
    postsData: [ /*Данные для компоненты MyPosts, получаем их будто из сервера*/
        {id: 1, message: 'Hi, how are you?', likesCount: '10'},
        {id: 2, message: 'It\'s my first post', likesCount: '23'},
    ],
    profile: null,
    userStatus: "",
}

const profilePageReducer = (state = initialState, action) => {
    if (action.type === ADD_NEW_POST) { //реагируем на приходящие action
        let newPost = { //создаём конечный подОбъект
            id: 3,
            /*id: this._state.dialogPage.messages[this._state.dialogPage.messages.length - 1].id + 1,*/
            message: action.newPostText,
            likesCount: '0',
        }
        return { //создаём и сразу возвращаем
            ...state,
            postsData: [...state.postsData, newPost/*вместо push*/], //отдельно копируем подъобъекты state и добавляем наш новый подОбъект в копию state используя onClick
        } //сделали глубокую копию state, так как собираемся менять массив
    } else if (action.type === DELETE_POST) { //реагируем на приходящие action
        return { //создаём и сразу возвращаем
            ...state,
            postsData: state.postsData.filter(posts => posts.id != action.id),
        } //for test
    } else if (action.type === SET_USER_PROFILE) { //реагируем на приходящие action
        return { //создаём и сразу возвращаем
            ...state,
            profile: action.profile //приравниваем примитив копии state
        }
    } else if (action.type === SET_USER_STATUS) {
        return {
            ...state,
            userStatus: action.userStatus
        }
    }
    return state
}

export const addNewPostActionCreator = (newPostText) => ({type: ADD_NEW_POST, newPostText: newPostText})//утилита, передающая action.type в f addNewPost
export const deletePostActionCreator = (id) => ({type: DELETE_POST, id}) //for test

export const setUserProfileAC = (profile) => {  //утилита, передающая action
    return { //возвращаем объект с параметрами action метода dispatch
        type: SET_USER_PROFILE,
        profile: profile,
    }
}

export const getUserProfileThunkCreator = (userId) => { //эту f вызывают, чтобы получить санку getUserProfileThunk,
    // которая сможет достучаться до передаваемых параметров
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators
        let data = await profileAPI.getProfile(userId) //делаем get запрос в файле api.js
        dispatch(setUserProfileAC(data)) //передаем приходящий profile в state
    }
}

export const setUserStatusAC = (userStatus) => {  //утилита, передающая action
    return { //возвращаем объект с параметрами action метода dispatch
        type: SET_USER_STATUS,
        userStatus: userStatus,
    }
}

export const getUserStatusThunkCreator = (userId) => {
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators
        let data = await profileAPI.getStatus(userId) //делаем get запрос в файле api.js
        dispatch(setUserStatusAC(data)) //передаем приходящий status из api в state
    }
}

export const updateUserStatusThunkCreator = (userStatus) => {
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators
        let data = await profileAPI.updateStatus(userStatus) //делаем put запрос в файле api.js и передаём в api наш userStatus
        if (data.resultCode === 0) { //если сервер дал добро
            dispatch(setUserStatusAC(userStatus)) //передаем приходящий userStatus в state
        }
    }
}

export default profilePageReducer