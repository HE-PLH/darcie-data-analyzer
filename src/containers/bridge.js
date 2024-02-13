import App from "./App";
import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../reducers";
import ReactDOM, {render} from "react-dom";
import MyRoutes from "./Routes";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function Bridge() {
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
}
