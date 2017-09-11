import * as $ from 'jquery';

export const CALL_API = 'CALL_API';

const api = store => next => action => { 
    if ( ! action[CALL_API] ) { 
        return next(action); 
    }
    let request = action[CALL_API];
    let { method, path, query, failureType, successType, sendingType } = request;
    let { dispatch, getState } = store;

    dispatch({ type: sendingType, pending: true });
    $.ajax({
        method: method,
        url: path,
        data: query
    }).fail(err => {
        dispatch({
            type: failureType,
            error: err
        });
    }).done(res => {
        dispatch({
            type: successType,
            items: res
        });
    }).always(() => {
        dispatch({ type: sendingType, pending: false });            
    });
};

export { api };