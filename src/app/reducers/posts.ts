import * as _ from 'underscore';
import * as types from '../actions/types';  
import { initialState } from './initialState';


const posts = (state = initialState.posts, action) => {
    switch (action.type) {
        case types.LOAD_POSTS_SUCCESS:
            return _.extend({}, state, {
                items: action.items
            });
        case types.LOAD_POSTS_SENDING:
            return _.extend({}, state, {
                pending: action.pending
            });
        case types.LOAD_POSTS_FAILED:
            return _.extend({}, state, {
                error: action.error
            });
        case types.UPDATE_DOMAIN_URL:
            return _.extend({}, state, {
                url: action.url,
                items: []
            });
        case types.UPDATE_SEARCH_TERM:
            return _.extend({}, state, {
                search: action.search
            });
        default: 
            return state;
    }
}

const getDomainUrl = getState => getState().posts.url;
const getSearchTerm = getState => getState().posts.search;

export { posts, getDomainUrl, getSearchTerm };
