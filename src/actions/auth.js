import axios from "axios";
import Usuario from "../model/Usuario";
import { SET_ALL_USERS, SET_LOGGEG_USER, SET_MANAGED_USER, UPDATE_FLAG } from "../reducers/types";
import { ROOT_URL, SUCCESS_TOAST } from "../utils/constants";
import { checkTypeUser, doesObjectExist, getRequestConfigurations, handleError } from "../utils/utils";
import { addToastMessage } from "./toast";


export const login = (contact, password) => async dispatch => { 
    try {
        // const requestConfig = getRequestConfigurations();
        // const URL = `${ROOT_URL}/usuario/login`;
       
        // let requestBody = {contacto: contact, password};
        // requestBody = JSON.stringify(requestBody);
        // const response = await axios.post(URL, requestBody, requestConfig);

        // console.log(`RESPONSE DATA: ${doesObjectExist(response.data)}`)

        // if (!doesObjectExist(response.data)) return dispatch({type: SET_LOGGEG_USER, payload: null})
        
        // const user = new Usuario(response.data);
        const user = new Usuario({
            "nome": "Mac Mahon",
            "email": "macmahon@gmail.com",
            "password": "123456",
            "contacto": "842399398",
            "genero": "MASCULINO",
            "cadeira": "Biologia",
        "numero_requisicoes": 1,
            "codigo": 7,
            "typeUser": "DOCENTE"
        });
        
        dispatch({type: SET_LOGGEG_USER, payload: user});
        dispatch(addToastMessage('Login Successful', SUCCESS_TOAST))

    } catch (error) {
        handleError(error);
    }
}

export const getAllUsers = () => async dispatch => {

    try {
        let intermediateResponse;
        const usersGetPath = ['getFuncReq/getAll', 'getAdmin/getAll', 'getDocente/getAll'];
        const requestConfig = getRequestConfigurations();
        let URL = `${ROOT_URL}/usuario/`;
        let response = [];

        for (let path of usersGetPath) { 
            intermediateResponse = await axios.get(`${URL}${path}`, {}, requestConfig);
            intermediateResponse = intermediateResponse.data.map(user => {
                return new Usuario({...user, type_account: checkTypeUser(user)})
            })
            response = [...response,...intermediateResponse];
        }

        dispatch({
            type: SET_ALL_USERS,
            payload: response
        })

    } catch (error) {
        handleError(error);
    }
    
}


export const setManagedUser = (mUser) => dispatch => { 
    dispatch({
        type: SET_MANAGED_USER,
        payload: mUser
    })
}
