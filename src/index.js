import * as serviceWorker from './serviceWorker'
import store from "./redux/redux-store"
import React from 'react' //jsx же транспилируется в js с конструкцией React.createElement - поэтому нужен import React,
// даже если явно в jsx'е нет конструкций с React
import ReactDOM from 'react-dom'
import './index.css'
import App from "./App"
import {HashRouter} from "react-router-dom"
import {Provider} from "react-redux";

ReactDOM.render(
    <HashRouter> {/* BrowserRouter для того, чтобы страницы могли переключаться без перезагрузки */}
        <Provider store={store}> {/*Использует контекст апи, чтобы в контекст засунуть store*/}
            <App/>
        </Provider>
        {/*<App dispatch={store.dispatch.bind(store)} store={store}/>*/}
        {/*bind возвращает другую симметричную f с заbindеным store*/}
        {/*байндим функции,because передаем их в глубину => мы не теряем this*/}
    </HashRouter>, document.getElementById('root')
)


/*rerenderEntireTree(store.getState()); //Вызываем f в первый раз

store.subscribe(() => {
    let state = store.getState(); //redux самостоятельно не передаёт state
    rerenderEntireTree(state); //перерисовка дерева
});*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
