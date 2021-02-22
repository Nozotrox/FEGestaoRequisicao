import { ADMIN_ACCOUNT, EMPLOYER_ACCOUNT, ESTADO_REQ_CANCELADA, ESTADO_REQ_CONFIRMADA, ESTADO_REQ_NOVA, ESTADO_REQ_TERMINADA, PROFESSOR_ACCOUNT } from "./constants";
import moment from 'moment'

export const handleError = (error) => { 
    console.log(error);
}

export const getRequestConfigurations = () => {
    return {
        headers: {
        "Content-Type": "application/json"
        }
    };
}

export const doesObjectExist = (object) => { 
    if (object === undefined) return false;
    if (!object) return false;
    if (object === null)  return false 
    if (Object.keys(object).length > 0) return true;
    if (!object) return false;

    return false;
}

export const doesInputTextFieldValueExist = (value) => { 
    if (value === '') return false;
    if (!value) return false;
    return true;
}

export const doesTwoValueEquals = (value1, value2) => { 
    if(value1 === value2) return true;
    return false;
}

export const doesArrayExist = object => { 
    if(!object) return false;
    if (object.length > 0) return true;
    return false;
}

export const extractUserFields = (fullObject, typeUser) => { 
    const base = ['contacto', 'email', 'genero', 'nome', 'password', 'departamento']
    const professor = ['numero_requisicoes', 'cadeira'];
    const employer = ['localizacao'];
    const admin = ['departamento'];

    const toReturn = {};

    if (typeUser === PROFESSOR_ACCOUNT) [...base, ...professor].forEach(key => toReturn[key] = fullObject[key]);
    if (typeUser === ADMIN_ACCOUNT) [...base, ...admin].forEach(key => toReturn[key] = fullObject[key]);
    if (typeUser === EMPLOYER_ACCOUNT) [...base, ...employer].forEach(key => toReturn[key] = fullObject[key]);

    return toReturn;
}

export const checkTypeUser = (userObj) => { 
    if(userObj.numero_requisicoes) return PROFESSOR_ACCOUNT;
    if(userObj.localizacao) return EMPLOYER_ACCOUNT;
    return ADMIN_ACCOUNT;
}

export const getMomentFromString  = str => { 
    return moment(str);
}

export const getRequestStateColor = (request) => { 
    const state = request.estado;
    if (state === ESTADO_REQ_TERMINADA) return 'danger';
    if (state === ESTADO_REQ_NOVA) return 'primary';
    if (state === ESTADO_REQ_CONFIRMADA) return 'success';
    if (state === ESTADO_REQ_CANCELADA) return 'danger';
    return 'warning';
}

export const getFromLocalStorage = name => { 
    const object = localStorage.getItem(name);
    if((object === null) || (object === undefined)) return null;
    return JSON.parse(object);
}

export const saveToLocalStorage = (name, value) => { 
    localStorage.setItem(name, JSON.stringify(value));
}

export const removeFromLocalStorage = (name) => { 
    localStorage.removeItem(name);
}