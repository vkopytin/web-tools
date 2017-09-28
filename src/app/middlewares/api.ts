import * as _ from 'underscore';
import * as $ from 'jquery';

export const CALL_API = 'CALL_API';


const api = store => next => action => { 
    if ( ! action[CALL_API] ) { 
        return next(action); 
    }
    let {
        method,
        path,
        query,
        failureType,
        successType,
        sendingType,
        opts,
        parse
    } = action[CALL_API];
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
        dispatch(_.extend({
            type: successType,
            res: parse ? parse(res) : res
        }, opts));
    }).always(() => {
        dispatch({ type: sendingType, pending: false });            
    });
};

export { api };