let SEND_NEW_MESSAGE = 'dialogsPageReducer/SEND_NEW_MESSAGE'; //используем константы, чтобы не опечататься в строках

let initialState = {
  //если подчасть state не приходит в reducer, то используем эту подчасть state по умолчанию
  dialogDataUsers: [
    /*Данные для компоненты DialogUser, получаем их будто из сервера*/
    { id: 1, userName: 'Slava' },
    { id: 2, userName: 'Yana' },
    { id: 3, userName: 'Boris' },
    { id: 4, userName: 'Dmitry' },
    { id: 5, userName: 'Vitalyi' },
    { id: 6, userName: 'Uliyana' },
  ],
  messagesData: [
    /*Данные для компоненты Message, получаем их будто из сервера*/
    { id: 1, message: '1 text' },
    { id: 2, message: '2 text' },
    { id: 3, message: '3 text' },
    { id: 4, message: '4 text' },
    { id: 5, message: '5 text' },
    { id: 7, message: '7 text' },
    { id: 8, message: '8 text' },
    { id: 9, message: '9 text' },
  ],
};

const dialogsPageReducer = (state = initialState, action) => {
  if (action.type === SEND_NEW_MESSAGE) {
    //реагируем на приходящие action
    return {
      //создаём и сразу возвращаем
      ...state,
      messagesData: [...state.messagesData, { id: 7, message: action.textMessage }], //добавляем новый подОбъект в state через onClick
    }; //сделали глубокую копию state, так как собираемся менять массив

    /*stateCopy.messagesData.push( { id: 7, /!*id: this._state.dialogPage.messages[this._state.dialogPage.messages.length - 1].id + 1,*!/
            message: newMessage} )//добавляем наш новый подОбъект в state используя onClick в button*/
  }

  return state;
};

export const sendNewMessageCreator = (textMessage) => ({
  type: SEND_NEW_MESSAGE,
  textMessage: textMessage,
}); //утилита, передающая action.type в f sendNewMessage

export default dialogsPageReducer;
