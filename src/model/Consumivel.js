import axios from "axios";
import { update } from "../actions/admin";
import { addToastMessage } from "../actions/toast";
import store from "../store";
import { ERROR_TOAST, MATERIAL_CONSUMIVEL, ROOT_URL, SUCCESS_TOAST } from "../utils/constants";
import { doesObjectExist, getRequestConfigurations } from "../utils/utils";

class Consumivel { 

    constructor(responseBody) { 
        
        if(doesObjectExist(responseBody)) { 
            this.newConsumivel = false;
            Object.keys(responseBody).forEach(property => { 
                this[property] = responseBody[property];
            });
            this.type_consumivel = responseBody.dtype;

        } else { 

            
            this.descricao = '';
            this.nome = '';
            this.quantidade = 1;
            this.disponivel = true;

            this.newConsumivel = true;
            this.type_consumivel = MATERIAL_CONSUMIVEL;
        }
    }

    set (property, value) { 
        this[property] = value;
        store.dispatch(update());
    }

    async delete () { 
        
        const url_path = (this.type_consumivel === MATERIAL_CONSUMIVEL)? `/deleteMat` : '/deleteServ';
        const requestConfig = getRequestConfigurations();
        const URL = `${ROOT_URL}/consumivel${url_path}/${this.codigo}`;

        try {
            await axios.delete(URL, requestConfig);
            store.dispatch(addToastMessage('Consumivel Eliminado!', SUCCESS_TOAST));
        } catch (error) {
            console.log(error);
            store.dispatch(addToastMessage(error.message, ERROR_TOAST));
        }
    }

    async _udpateConsumivel() { 

        const url_path = (this.type_consumivel === MATERIAL_CONSUMIVEL)? `/updateMat` : '/updateServ';

        const requestConfig = getRequestConfigurations();
        const requestBody = JSON.stringify(this);
        const URL = `${ROOT_URL}/consumivel${url_path}`;

        try {
            await axios.put(URL, requestBody, requestConfig);
            store.dispatch(addToastMessage('Consumivel Actualizado!', SUCCESS_TOAST));
        } catch (error) {
            console.log(error);
            store.dispatch(addToastMessage(error.message, ERROR_TOAST));
        }
    }

    async save() { 

    if (!this.newConsumivel) return this._udpateConsumivel();
    

        const url_path = (this.type_consumivel === MATERIAL_CONSUMIVEL)? `/addMat` : '/addServ';

        const requestConfig = getRequestConfigurations();
        const requestBody = JSON.stringify(this);
        const URL = `${ROOT_URL}/consumivel${url_path}`;

        try {
            await axios.post(URL, requestBody, requestConfig);
            store.dispatch(addToastMessage('Consumivel Adicionado!', SUCCESS_TOAST));
        } catch (error) {
            console.log(error);
            store.dispatch(addToastMessage(error.message, ERROR_TOAST));
        }

    }

    async deleteConsumivel() { 

    }
}


export default Consumivel;