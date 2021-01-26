import {SET_ALL_USERS, SET_LOGGEG_USER, SET_MANAGED_USER} from './types'
const initialState = { 
    user: {
        "nome": "Mac Mahon",
        "email": "macmahon@gmail.com",
        "password": "123456",
        "contacto": "842399398",
        "genero": "MASCULINO",
        "cadeira": "Biologia",
        "numero_requisicoes": 1,
        "codigo": 7,
        "typeUser": "DOCENTE",
        "requisicao": {}
    },
    mUser: {},
    allUsers: []
}

export default function(state=initialState, action) { 
    const {type, payload} = action;
    switch(type) { 
        case SET_LOGGEG_USER: return {...state, user: payload}
        case SET_MANAGED_USER: return {...state, mUser: payload}
        case SET_ALL_USERS: return {...state, allUsers: payload}
        default: return state;
    }
}