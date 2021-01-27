import { ADMIN_ACCOUNT, EMPLOYER_ACCOUNT, ERROR_TOAST, MASCULINO, PROFESSOR_ACCOUNT, ROOT_URL, SUCCESS_TOAST } from "../utils/constants";
import { doesObjectExist, extractUserFields, getRequestConfigurations } from "../utils/utils";
import {update} from '../actions/admin'
import store from '../store';
import axios from "axios";
import { addToastMessage } from "../actions/toast";
import Requisicao from "./Requisicao";
import moment from 'moment';

class Usuario { 
constructor(responseBody)  {
if(doesObjectExist(responseBody)) {
        this.newUser = false; 
        Object.keys(responseBody).forEach(property => { 
            this[property] = responseBody[property];
        })

        this.p_nome = responseBody.nome.split(" ")[0];
        this.apelido =  responseBody.nome.split(" ")[1];
        this.requisicao = new Requisicao(this);


        if (this.typeUser === PROFESSOR_ACCOUNT) { 
            this.getMyRequests();
        } else if (this.typeUser === EMPLOYER_ACCOUNT) { 
            this.getRequests();
        }

    } else { 
        this.newUser = true;

        this.contacto = '';
        this.email = '';
        this.genero = MASCULINO;
        this.nome = '';
        this.password = '';
        this.departamento = '';
        this.numero_requisicoes = 1;
        this.localizacao = '';
        this.cadeira = '';

        this.requisicao = {}
        this.p_nome = '';
        this.apelido = '';
        this.password_2 = '';  
        this.type_account = PROFESSOR_ACCOUNT; 
    }
}

copy (responseBody) { 
    const avoidCopy  =['requisicao', ]
    Object.keys(responseBody).forEach( property => {
        if(!avoidCopy.includes(property)) this[property] = responseBody[property];
    })
}

set (property, value) { 
    this[property] = value;
    store.dispatch(update());
}

async _updateUser() { 
    const url_path = (this.type_account === ADMIN_ACCOUNT)? `/updateAdmin` : (this.type_account === PROFESSOR_ACCOUNT)? '/updateDocente' : '/updateFuncReq';

    const requestConfig = getRequestConfigurations();
    let requestBody = extractUserFields(this, this.type_account);
    requestBody = JSON.stringify({...requestBody, codigo: this.codigo});
    const URL = `${ROOT_URL}/usuario${url_path}`;

    try {
        await axios.post(URL, requestBody, requestConfig);
        store.dispatch(addToastMessage('Usuario Actualizado!', SUCCESS_TOAST));
    } catch (error) {
        console.log(error);
        store.dispatch(addToastMessage(error.message, ERROR_TOAST));
    }
}

async save()  {
    this.nome = `${this.p_nome} ${this.apelido}`;
    if (!this.newUser) return this._updateUser();
    

    const url_path = (this.type_account === ADMIN_ACCOUNT)? `/addAdmin` : (this.type_account === PROFESSOR_ACCOUNT)? '/adicionarDocente' : '/adicionarFunc';

    const requestConfig = getRequestConfigurations();
    let requestBody = extractUserFields(this, this.type_account);
    requestBody = JSON.stringify(requestBody);
    const URL = `${ROOT_URL}/usuario${url_path}`;

    try {
        await axios.post(URL, requestBody, requestConfig);
        store.dispatch(addToastMessage('Usuario Adicionado!', SUCCESS_TOAST));
    } catch (error) {
        console.log(error);
        store.dispatch(addToastMessage(error.message, ERROR_TOAST));
    }

}

async getMyRequests() { 

    const requestConfig = getRequestConfigurations();
    const requestBody = JSON.stringify(this);
    const URL = `${ROOT_URL}/requisicao/getByDoc`;

    try {
        
        const response = await axios.post(URL, requestBody, requestConfig);
        this.requests = response.data.map(req => {
                const requisicao = new Requisicao();
                requisicao.build(req);
                return requisicao;
            });
        store.dispatch(update());

    } catch (error) {
        console.log(error.message);
        store.dispatch(addToastMessage(error.message, ERROR_TOAST));
    }

}


async getRequests() { 

    const requestConfig = getRequestConfigurations();
    const URL = `${ROOT_URL}/requisicao/getToday`;
    const today = moment().format("YYYY-MM-DD"); //.subtract(1, "day")
    const requestBody = JSON.stringify({date: today})

    console.log(today);

    try {
        
        const response = await axios.post(URL, requestBody, requestConfig);
        this.requests = response.data.map( req => {
            const requisicao = new Requisicao();
            requisicao.build(req);
            return requisicao;
        });
        store.dispatch(update());

    } catch (error) {
        console.log(error.message);
        store.dispatch(addToastMessage(error.message, ERROR_TOAST));
    }
}

async delete() { 
    
    const url_path = (this.type_account === ADMIN_ACCOUNT)? `/deleteAdmin` : (this.type_account === PROFESSOR_ACCOUNT)? '/deleteDocente' : '/deleteFuncReq';

    const requestConfig = getRequestConfigurations();
    let requestBody = extractUserFields(this, this.type_account);
    requestBody = JSON.stringify(requestBody);
    const URL = `${ROOT_URL}/usuario${url_path}/${this.codigo}`;
    store.dispatch(addToastMessage('USUARIO REMOVIDO!', SUCCESS_TOAST));

    try {
        
        await axios.delete(URL,requestConfig);
        
    } catch (error) {
        console.log(error.message);
        store.dispatch(addToastMessage(error.message, ERROR_TOAST));
    }

}


}

export default Usuario;