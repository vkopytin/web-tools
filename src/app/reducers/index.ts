import { combineReducers } from 'redux';  
import { posts, getDomainUrl, getSearchTerm } from './posts'
export { initialState } from './initialState';

const rootReducer = combineReducers({  
    posts,
    sites: (state = {}) => state
})

export { rootReducer, getDomainUrl, getSearchTerm };
