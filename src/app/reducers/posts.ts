import * as _ from 'underscore';
import * as types from '../actions/types';  
import { initialState } from './initialState';


const getDomainUrl = getState => getState().posts.url;
const getSecureDomainUrl = getState => getState().posts.secureUrl;
const getSearchTerm = getState => encodeURIComponent(getState().posts.search).replace(/%20/g, '+');

const posts = (state = initialState.posts, action) => {
    switch (action.type) {
        case types.LOAD_POSTS_SUCCESS:
            return _.extend({}, state, {
                items: action.res
            });
        case types.LOAD_POSTS_SENDING:
            return _.extend({}, state, {
                pending: action.pending
            });
        case types.LOAD_POSTS_FAILED:
            return _.extend({}, state, {
                error: action.error
            });

        case types.LOAD_POST_HISTORY_SUCCESS:
            let history = _.extend({}, state.history);
            history[action.post_id] = action.res;
            return _.extend({}, state, {
                history: history
            });
        case types.LOAD_POST_HISTORY_SENDING:
            return _.extend({}, state, {
                pending: action.pending
            });
        case types.LOAD_POST_HISTORY_FAILED:
            return _.extend({}, state, {
                error: action.error
            });

        case types.SEARCH_POSTS_SUCCESS:
            return _.extend({}, state, {
                items: action.res
            });
        case types.SEARCH_POSTS_SENDING:
            return _.extend({}, state, {
                pending: action.pending
            });
        case types.SEARCH_POSTS_FAILED:
            return _.extend({}, state, {
                error: action.error
            });

        case types.UPDATE_DOMAIN_URL:
            return _.extend({}, state, {
                url: action.url,
                secureUrl: action.secureUrl,
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

export { posts, getDomainUrl, getSearchTerm, getSecureDomainUrl };
