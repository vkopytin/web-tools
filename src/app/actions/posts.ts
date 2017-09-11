import * as types from './types';
import { CALL_API } from '../middlewares/api';
import { getDomainUrl, getSearchTerm } from '../reducers';


export function loadPostsSuccess(items) {
    return {
        type: types.LOAD_POSTS_SUCCESS,
        items
    };
}

export function loadPostsSending(pending) {
  return {
    type: types.LOAD_POSTS_SENDING,
    pending: pending
  }
}

export function updateDomainUrl(url) {
    return {
        type: types.UPDATE_DOMAIN_URL,
        url
    };
}

export function updateSearchTerm(search) {
    return {
        type: types.UPDATE_SEARCH_TERM,
        search
    };
}

export function loadPosts(search) {

    return (dispatch, getState) => {
        dispatch(updateSearchTerm(search));

        dispatch({
            [CALL_API]: {
                method: 'get',
                path: getDomainUrl(getState) + '/search/',
                query: {
                    q: getSearchTerm(getState),
                    format: 'json'
                },
                sendingType: types.LOAD_POSTS_SENDING,
                successType: types.LOAD_POSTS_SUCCESS,
                failureType: types.LOAD_POSTS_FAILED
            }
        })
    };
}
