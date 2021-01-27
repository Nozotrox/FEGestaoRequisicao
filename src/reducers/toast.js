import { ERROR_TOAST, LOADING_TOAST, SUCCESS_TOAST } from '../utils/constants';
import {ADD_TOAST_MESSAGE, REMOVE_TOAST_MESSAGE} from './types'

const initialState = { 
    messages: [],
}

export default function(state=initialState, action) { 
    const {type, payload} = action;
    switch(type) { 
        case ADD_TOAST_MESSAGE :  return {...state, messages: [...state.messages, payload]}
        case REMOVE_TOAST_MESSAGE: return {...state, messages: state.messages.filter(message => message.id !== payload)}
        default: return state;
    }
}