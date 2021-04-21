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

