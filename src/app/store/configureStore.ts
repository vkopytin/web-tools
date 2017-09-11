import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import { api } from '../middlewares/api';


const createStoreWithMiddleware = applyMiddleware(
    api,
    thunk
)(createStore);

const configureStore = (initialState = {}) => {
    return createStoreWithMiddleware(rootReducer, initialState);
};

export { configureStore }
