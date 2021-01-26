import { ADD_TOAST_MESSAGE, REMOVE_TOAST_MESSAGE } from '../reducers/types';

const crypto = require('crypto');

export const addToastMessage = (message, type) => dispatch => { 
    const id = crypto.createHash('md5');

    dispatch({
        type: ADD_TOAST_MESSAGE,
        payload: {id, message, type}
    });

    setTimeout(() => {
        dispatch({
            type: REMOVE_TOAST_MESSAGE,
            payload: id
        })
    }, 8000);
}