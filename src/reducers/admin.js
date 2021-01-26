import { DASHBOARD_PAGE } from '../utils/constants';
import { SET_ALL_CONSUMABLES, SET_CONS_REQ_COUNT, SET_MANAGED_CONSUMIVEL, SET_USER_COUNT, UPDATE_FLAG } from './types'
const initialState = { 
    flag: true,
    userCount: {},
    consReq: {},
    mConsumivel: {},
    allConsumables: [],
}

export default function(state=initialState, action) { 
    const {type, payload} = action;
    switch(type) { 
        case SET_USER_COUNT: return {...state, userCount: payload}
        case SET_CONS_REQ_COUNT: return {...state, consReq: payload}
        case UPDATE_FLAG: return {...state, flag: !state.flag}
        case SET_MANAGED_CONSUMIVEL: return {...state, mConsumivel: payload}
        case SET_ALL_CONSUMABLES: return {...state, allConsumables: payload}
        default: return state;
    }
}