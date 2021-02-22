import axios from "axios";
import { SET_ALL_CONSUMABLES, SET_CONS_REQ_COUNT, SET_MANAGED_CONSUMIVEL, SET_USER_COUNT, UPDATE_FLAG } from "../reducers/types";
import { ERROR_TOAST, ROOT_URL } from "../utils/constants";
import { doesObjectExist, getRequestConfigurations, handleError } from "../utils/utils";
import {addToastMessage} from '../actions/toast'
import Consumivel from "../model/Consumivel";

export const getUserCount = (contact, password) => async dispatch => { 
    try {

        const requestConfig = getRequestConfigurations();
        const URL = `${ROOT_URL}/admin/userCount`;
        console.log(`ROOT_URL: ${ROOT_URL}`)
        let requestBody = {contacto: contact, password};
        requestBody = JSON.stringify(requestBody);
        const response = await axios.post(URL, requestBody, requestConfig);
    
        if (doesObjectExist(response.data)) return dispatch({type: SET_USER_COUNT, payload: response.data})
    
    } catch (error) {
        dispatch(addToastMessage(error.message, ERROR_TOAST));
    }
}

export const getAllConsumables = () => async dispatch => { 

    try {

        const requestConfig = getRequestConfigurations();
        const URL = `${ROOT_URL}/consumivel/getAll`;

        const response = await axios.get(URL, requestConfig);

        let consumables = [];
        consumables = response.data.map(consumable => { 
            return new Consumivel(consumable);
        })

        dispatch({
            type: SET_ALL_CONSUMABLES,
            payload: consumables
        })

        dispatch(update());
        
    } catch (error) {
        handleError(error);
    }
}

export const getConsReqCount = (contact, password) => async dispatch => { 
    try {
        const dataToSet = {};
        const requestConfig = getRequestConfigurations();
        let URL = `${ROOT_URL}/admin/consCount`;
        console.log(`ROOT_URL: ${ROOT_URL}`)
        let requestBody = {contacto: contact, password};
        let response = await axios.post(URL, requestBody, requestConfig);

        if(!doesObjectExist(response.data)) return;

        dataToSet.consumables = response.data;

        URL = `${ROOT_URL}/admin/allReq`;
        console.log(`ROOT_URL: ${ROOT_URL}`)
        requestBody = {contacto: contact, password};
        response = await axios.post(URL, requestBody, requestConfig);

        if(!doesObjectExist(response.data)) dataToSet.requests = [];

        dataToSet.requests = response.data;

        dispatch({ 
            type: SET_CONS_REQ_COUNT,
            payload: dataToSet
        });

    } catch (error) {
        dispatch(addToastMessage(error.message, ERROR_TOAST));
    }
}

export const setManagedConsumivel = (consumivel) => dispatch => { 
    dispatch({
        type: SET_MANAGED_CONSUMIVEL,
        payload: consumivel
    })
}

export const update = () => dispatch => { 
    dispatch({ 
        type: UPDATE_FLAG,
        payload: ''
    })
}