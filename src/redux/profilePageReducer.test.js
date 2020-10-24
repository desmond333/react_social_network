import ReactDOM from "react-dom";
import React from "react";
import profilePageReducer from "./profilePageReducer";
import {addNewPostActionCreator, deletePostActionCreator} from "./profilePageReducer";

//JEST тесты

//1.) Готовим исходные данные
let state = { //если подчасть state не приходит в reducer, то используем эту подчасть state по умолчанию
    postsData: [ /*Данные для компоненты MyPosts, получаем их будто из сервера*/
        {id: 1, message: 'Hi, how are you?', likesCount: '10'},
        {id: 2, message: 'It\'s my first post', likesCount: '23'},
    ],
}

it('length should be increment', () => { //название теста
    let action = addNewPostActionCreator("lolkek")

    //2.) Тестим
    let newState = profilePageReducer(state,action) //reducer на выходе должен возвращать одно и тоже

    //3.) Что мы ожидаем получить (expectation)
    expect(newState.postsData.length).toBe(3)
})

it('after deleting length of messages should be decrement', () => { //название теста
    let action = deletePostActionCreator(2)

    //2.) Тестим
    let newState = profilePageReducer(state,action) //reducer на выходе должен возвращать одно и тоже

    //3.) Что мы ожидаем получить (expectation)
    expect(newState.postsData.length).toBe(1)
})

it('after deleting length of messages should not be decrement if id is incorrect', () => { //название теста
    let action = deletePostActionCreator(20)

    //2.) Тестим
    let newState = profilePageReducer(state,action) //reducer на выходе должен возвращать одно и тоже

    //3.) Что мы ожидаем получить (expectation)
    expect(newState.postsData.length).toBe(2)
})