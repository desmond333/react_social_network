import {usersAPI} from './../api/api';

let FOLLOW = "usersPageReducer/FOLLOW" //используем константы, чтобы не опечататься в строках
let UNFOLLOW = "usersPageReducer/UNFOLLOW"
let SET_USERS = "usersPageReducer/SET_USERS"
let SET_CURRENT_PAGE = "usersPageReducer/SET_CURRENT_PAGE"
let SET_TOTAL_COUNT_USERS = "usersPageReducer/SET_TOTAL_COUNT_USERS"
let TOGGLE_IS_FETCHING = "usersPageReducer/TOGGLE_IS_FETCHING"
let TOGGLE_IS_FOLLOWING_PROGRESS = "usersPageReducer/TOGGLE_IS_FOLLOWING_PROGRESS"


let initialState = { //если подчасть state не приходит в reducer, то используем эту подчасть state по умолчанию
    usersData: [], /*Данные для компоненты MyPosts, получаем их будто из сервера*/
    totalUsersCount: 30,
    displayUsersNumber: 12,
    currentPage: 1,
    isFetching: false, //запрос ПОСЫЛАЕТСЯ?
    followingInProgress: [], //массив кликнутых пользователей
}

const usersPageReducer = (state = initialState, action) => {
    switch (action.type) { //реагируем на приходящие action

        case FOLLOW:
            return { //создаём и сразу возвращаем
                ...state,
                usersData: state.usersData.map((element, id) => { //копируем и кого-то изменяем благодаря map
                    if (element.id === action.userId) { //if id нашего юзера = id выбранного пользователем юзера
                        return {...element, followed: true} //возвращаем измененную копию с примитивом:true
                    }
                    return element //иначе просто возвращаем тот же самый объект
                }),
            } //сделали глубокую копию state, так как собираемся менять массив

        case UNFOLLOW:
            return { //создаём и сразу возвращаем
                ...state,
                usersData: state.usersData.map((element, id) => { //копируем и кого-то изменяем благодаря map
                    if (element.id === action.userId) { //if id нашего юзера = id выбранного пользователем юзера
                        return {...element, followed: false} //возвращаем измененную копию с примитивом:true
                    }
                    return element //иначе просто возвращаем тот же самый объект
                }),
            } //сделали глубокую копию state, так как собираемся менять массив

        case SET_USERS:
            return {
                ...state,
                usersData: action.users //получаем юзеров с сервера через action
                // при каждом onClick мы перезатираем массив пользователей
            }

        case SET_CURRENT_PAGE:
            return { //создаём и сразу возвращаем
                ...state,
                currentPage: action.currentPage, //передаёт в initialState выбранную сейчас страницу
            }
        case SET_TOTAL_COUNT_USERS:
            return { //создаём и сразу возвращаем
                ...state,
                totalUsersCount: action.totalCount, //передаёт в initialState общее число юзеров, передаваемых из сервера
            }
        case TOGGLE_IS_FETCHING:
            return { //создаём и сразу возвращаем
                ...state,
                isFetching: action.isFetching, //передаёт в initialState инфу о подгрузке
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return { //создаём и сразу возвращаем
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] //деструктуризируем массив, который был и добавляем userId
                    : state.followingInProgress.filter(id => id != action.userId) //фильтрация возвращает нам новую копию массива
            }
        default:
            return state
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId})//утилита, передающая action.type

export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})//утилита, передающая action.type

export const setUsersAC = (users) => ({type: SET_USERS, users})//утилита, передающая action.type

export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage})//утилита, передающая action.type

export const setTotalCountUsersAC = (totalCount) => ({type: SET_TOTAL_COUNT_USERS, totalCount: totalCount})//утилита, передающая action.type

export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})//утилита, передающая action.type

export const toggleIsFollowingProgressAC = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})//утилита, передающая action.type

export const getUsersThunkCreator = (currentPage, displayUsersNumber) => { //эту f вызывают, чтобы получить санку getUsersThunk,
    // которая сможет достучаться до передаваемых параметров
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators

        dispatch(toggleIsFetchingAC(true)) // активируем preloader в начале запроса

        let data = await usersAPI.getUsers(currentPage, displayUsersNumber)//делаем get запрос в файле api.js
        dispatch(setUsersAC(data.items)) //приходит массив items, в котором сидят все юзеры
        dispatch(setTotalCountUsersAC(data.totalCount)) //приходит общее число пользователей
        dispatch(toggleIsFetchingAC(false)) // выключаем preloader в конце запроса
    }
}

export const unfollowThunkCreator = (userId) => { //эту f вызывают, чтобы получить санку unfollowThunk,
    // которая сможет достучаться до передаваемых параметров
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators

        dispatch(toggleIsFollowingProgressAC(true, userId)) //запрос посылается? YES

        let data = await usersAPI.unfollow(userId) //делаем delete запрос в файле api.js, добавляем на кого отписываемся
        if (data.resultCode == 0) { //если сервер потвердил, что отписка произошла
            dispatch(unfollowAC(userId))
        }

        dispatch(toggleIsFollowingProgressAC(false, userId))//запрос посылается? NO
    }
}

export const followThunkCreator = (userId) => { //эту f вызывают, чтобы получить санку followThunk,
    // которая сможет достучаться до передаваемых параметров
    return async (dispatch) => { //асинхронная f, которая диспатчит внутри себя обычные action creators

        dispatch(toggleIsFollowingProgressAC(true, userId)) //запрос посылается? YES

        let data = await usersAPI.follow(userId) //делаем post запрос в файле api.js, добавляем на кого подписываемся
        if (data.resultCode == 0) { //если сервер потвердил, что подписка произошла
            dispatch(followAC(userId))
        }

        dispatch(toggleIsFollowingProgressAC(false, userId))//запрос посылается? NO
    }
}

export default usersPageReducer