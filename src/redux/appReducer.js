import {getAuthUserThunkCreator} from "./authReducer";

let INITIALIZED_SUCCESSED = "INITIALIZED_SUCCESSED" //используем константы, чтобы не опечататься в строках

let initialState = { //если подчасть state не приходит в reducer, то используем эту подчасть state по умолчанию
    initialized: false, //гл. инициализировать; определение чего-либо, присвоение значений переменным программы
}

const appReducer = (state = initialState, action) => {
    switch (action.type) { //реагируем на приходящие action

        case INITIALIZED_SUCCESSED:
            return { //создаём и сразу возвращаем
                ...state,
                initialized: true,
            }

        default:
            return state
    }
}

export const initializedSuccessedAC = () => ({type: INITIALIZED_SUCCESSED});

export const initializedAppThunkCreator = () => { //эту f вызывают, чтобы получить санку initializedThunk,
    // которая сможет достучаться до передаваемых параметров
    return (dispatch) => { //f, которая диспатчит внутри себя обычные action creators
        let promise = dispatch(getAuthUserThunkCreator()) //к нам возвращается промис от диспатча креатора из authReducer.js
        Promise.all([promise]) //помещаем все промисы в массив
        //дожидаемся завершения всех параллельных асинхронных запросов
        .then( () => { //когда промис зарезолвиться,
            //(от английского resolve и означает решать, принимать решение. ..Резолвить (или зарезолвить) - это "разрешить")
            dispatch(initializedSuccessedAC()) //значит, инициализация завершена
        })
    }
}

export default appReducer