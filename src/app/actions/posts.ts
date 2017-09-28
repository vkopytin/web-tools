import * as types from './types';
import { CALL_API } from '../middlewares/api';
import { getDomainUrl, getSecureDomainUrl, getSearchTerm } from '../reducers';

const unpack = (path, obj, def) => path.split('.').reduce((res, x) => {
    if (!res || !res[x]) return def;
    return res[x];
}, obj);

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

export function loadPostHistorySuccess(history) {
    return {
        type: types.LOAD_POST_HISTORY_SUCCESS,
        history
    };
}

export function loadPostHistorySending(pending) {
  return {
    type: types.LOAD_POST_HISTORY_SENDING,
    pending: pending
  }
}

export function searchPostsSuccess(items) {
    return {
        type: types.SEARCH_POSTS_SUCCESS,
        items
    };
}

export function searchPostsSending(pending) {
  return {
    type: types.SEARCH_POSTS_SENDING,
    pending: pending
  }
}

export function updateDomainUrl(site) {
    return {
        type: types.UPDATE_DOMAIN_URL,
        url: site.url,
        secureUrl: site.secureUrl
    };
}

export function updateSearchTerm(search) {
    return {
        type: types.UPDATE_SEARCH_TERM,
        search
    };
}

const postsPayloadParse = ({ data }) => data.map(item => ({
    id: item.id,
    headline: item.headline,
    subheadline: item.subheadline,
    body: 'There is no body. Please, check description.',
    description: item.body.desktop,
    brief: item.body.mobile,
    image980x: unpack('splash.images.large.url', item, ''),
    image210x: unpack('splash.images.small.url', item, ''),
    photo_credit: unpack('splash.photo_credit', item, ''),
    post_url: item.url,
    listicle: item.listicle && item.listicle.items && {
        items: item.listicle.items.map(lwItem => ({
            id: lwItem.id,
            headline: lwItem.headline,
            body: lwItem.body.desktop,
            description: lwItem.body.mobile,
            image980x: unpack('splash.images.large.url', lwItem, ''),
            image210x: unpack('splash.images.small.url', lwItem, '')
        }))
    }
}));

export function loadPosts(from, limit) {

    return (dispatch, getState) => {

        dispatch({
            [CALL_API]: {
                method: 'get',
                path: getDomainUrl(getState) + '/api/1.1/posts/frontpage',
                query: {
                    from: from || 0,
                    limit: limit || 10
                },
                parse: postsPayloadParse,
                sendingType: types.LOAD_POSTS_SENDING,
                successType: types.LOAD_POSTS_SUCCESS,
                failureType: types.LOAD_POSTS_FAILED
            }
        })
    };
}

export function loadPostHistory(postId, from, limit) {

    return (dispatch, getState) => {
        
        dispatch({
            [CALL_API]: {
                method: 'get',
                path: getSecureDomainUrl(getState) + `/core/roar/posts/${postId}/history`,
                query: {
                    from: from || 0,
                    limit: limit || 10
                },
                opts: {
                    post_id: postId
                },
                sendingType: types.LOAD_POST_HISTORY_SENDING,
                successType: types.LOAD_POST_HISTORY_SUCCESS,
                failureType: types.LOAD_POST_HISTORY_FAILED
            }
        })
    };
}

export function searchPosts(search) {
    
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
                sendingType: types.SEARCH_POSTS_SENDING,
                successType: types.SEARCH_POSTS_SUCCESS,
                failureType: types.SEARCH_POSTS_FAILED
            }
        })
    };
}
