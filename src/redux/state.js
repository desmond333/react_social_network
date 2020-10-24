import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";

let store = { //внешнее имя объекта, которое может меняться
    _state: {
        profilePage: {
            postsData: [ /*Данные для компоненты MyPosts, получаем их будто из сервера*/
                {id: 1, message: 'Hi, how are you?', likesCount: '10'},
                {id: 2, message: 'It\'s my first post', likesCount: '23'},
            ],
            newPostText: 'Как дела у вас, мои подписчики?' //передается через props в value textarea
        },
        dialogsPage: {
            dialogDataUsers: [ /*Данные для компоненты DialogUser, получаем их будто из сервера*/
                {id: 1, userName: 'Slava'},
                {id: 2, userName: 'Alina'},
                {id: 3, userName: 'Boris'},
                {id: 4, userName: 'Alexey'},
                {id: 5, userName: 'Vitalyi'},
                {id: 6, userName: 'Maria'},
            ],
            messagesData: [ /*Данные для компоненты Message, получаем их будто из сервера*/
                {id: 1, message: '1 text'},
                {id: 2, message: '2 text'},
                {id: 3, message: '3 text'},
                {id: 4, message: '4 text'},
                {id: 5, message: '5 text'},
                {id: 6, message: '6 text'},
            ],
            newMessageText: 'Привет. '
        },
    }, //нижнее подчеркивание для того, чтобы никто глобально не использовал state

    _callSubscriber() { //задача f уведомить подписчика превратиться в f rerenderEntireTree
        console.log('no subscribers(observers)')
    },

    getState() { // возвращаем актуальный state
        return this._state;
    },
    subscribe(observer) { //паттерн наблюдатель
        this._callSubscriber = observer //приравниваем к f rerenderEntireTree
    },

    dispatch(action) {
        this._state.profilePage = profilePageReducer(this._state.profilePage, action)
        /*обновляем или нет state и присваиваем настоящий state к полученному из reducer state*/

        this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action)
        /*обновляем или нет state и присваиваем настоящий state к полученному из reducer state*/

        this._callSubscriber(this._state)//перерисовываем наше дерево заново благодаря f rerenderEntireTree
    },
}

export default store