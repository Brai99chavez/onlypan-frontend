import {applyMiddleware, createStore, compose} from "redux";
import rootReducer from "../Reducer/Reducer";
import thunk from 'redux-thunk';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)))

export default store;
