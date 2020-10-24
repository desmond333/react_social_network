import * as axios from "axios"

//делегировали axios запросы из компоненты UsersContainer сюда, в DAL (Data Access Layer)
const instance = axios.create({ //создаем экземпляр axios
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "04cbf382-5051-418e-bc14-aa121ee09f50",
    },
})

export const usersAPI = { //объект для работы с определённым endpoint, упаковка с методами
    getUsers(currentPage = 1, displayUsersNumber = 10) {
        return instance.get(`users?page=${currentPage}&count=${displayUsersNumber}`,)
            //в первом параметре=page=актуальный меняющийся запрос, во втором параметре=count=запрос НЕменяющийся
            .then(response => { //цепочка промисов
                return response.data; //возращаем лишь то, что реально нужно UsersContainer
            })
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`,)
            .then(response => { //цепочка промисов
                return response.data; //возращаем лишь то, что реально нужно UsersContainer
            })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`,)
            .then(response => { //цепочка промисов
                return response.data; //возращаем лишь то, что реально нужно UsersContainer
            })
    }
}

export const profileAPI = { //объект для работы с определённым endpoint, упаковка с методами
    getProfile(userId) { //возвращает результат обработки метода get
        return instance.get(`profile/` + userId)
            .then(response => { //цепочка промисов
                return response.data
            })
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId)
            .then(response => {
                return response.data
            })
    },
    updateStatus(userStatus) {
        return instance.put('profile/status', {
            status: userStatus
        })
            .then(response => {
                return response.data
            })
    },
}

export const authAPI = { //объект, который хранит методы запроса связанные с авторизацией
    me() { //возвращает результат обработки метода get
        return instance.get(`auth/me`)
            .then(response => { //цепочка промисов
                return response.data;
            })
    },
    login(email, password, rememberMe = false) { //возвращает результат обработки метода post
        return instance.post('auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe,
        })
            .then(response => { //цепочка промисов
                return response.data;
            })
    },
    logout() { //возвращает результат обработки метода delete
        return instance.delete('auth/login') //сервер удаляет куку и мы становимся анонимами
            .then(response => { //цепочка промисов
                return response.data;
            })
    },
}



