import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './reducers/auth';
import reducer from './ducks/reducer';
import reduxThunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(combineReducers({
    auth: authReducer,   // `auth` is used as state of the store,
    reducer: reducer
}), composeEnhancers(applyMiddleware(reduxThunk)));
