import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(combineReducers({
    auth: authReducer   // `auth` is used as state of the store
}), composeEnhancers(applyMiddleware(reduxThunk)));