import axios from "axios";
import moment from "moment";
import { getAllConsumables, update } from "../actions/admin";
import { addToastMessage } from "../actions/toast";
import store from "../store";
import { ERROR_TOAST, ESTADO_REQ_NOVA, ROOT_URL, SUCCESS_TOAST } from "../utils/constants";
import { doesArrayExist, doesObjectExist, getRequestConfigurations } from "../utils/utils";
import Usuario from "./Usuario";

class Requisicao { 

    constructor(user, responseBody) { 
        
        this.dataHora = moment().format("YYYY-MM-DD HH:mm:ss");
        this.destino = '';
        this.estado = ESTADO_REQ_NOVA;
        this.consumiveis = [];
        this.funcionario = {};
        this.qtdMap = {}

        if (doesObjectExist(user)) { 
            const novoUsuario = new Usuario();
            novoUsuario.copy(user);
            this.docente = novoUsuario;
            this._getRandomFuncionario();
        }
    }

    set(property, value) { 
        this[property] = value;
        store.dispatch(update());
    }

    build(responseBody) { 
    Object.keys(responseBody).forEach(key => { 
        this[key] = responseBody[key];
    })
    }

    contains (consumivel) { 
        const found = this.consumiveis.find(cons => cons.codigo === consumivel.codigo);
        return doesObjectExist(found);
    }

    add(consumivel) {
        if  (this.contains(consumivel)) return;
        this.consumiveis.push(consumivel);
        this.qtdMap[consumivel.codigo] = 1;
        store.dispatch(update());
        
    }

    increaseQtd(consumivel) { 
        const codigoConsumivel = consumivel.codigo;
        const qtdConsumivel = this.qtdMap[codigoConsumivel];
        if (consumivel.quantidade === qtdConsumivel) return store.dispatch(addToastMessage('Quantidade Maxima Atingida', ERROR_TOAST));
        this.qtdMap[codigoConsumivel] = qtdConsumivel + 1;
        store.dispatch(update());
    }

    decreaseQtd(consumivel) { 
        const codigoConsumivel = consumivel.codigo;
        const qtdConsumivel = this.qtdMap[codigoConsumivel];
        if (qtdConsumivel === 1) return this.remove(consumivel);
        this.qtdMap[codigoConsumivel] = qtdConsumivel - 1;
        store.dispatch(update());
    }

    remove(consumivel) { 
        this.consumiveis = this.consumiveis.filter(cons => cons.codigo !== consumivel.codigo);
        store.dispatch(update());
    }

    async update () { 
        const requestConfig = getRequestConfigurations();
        const requestBody = JSON.stringify(this);
        const URL = `${ROOT_URL}/requisicao/updateReq`;

        try {
            await axios.put(URL, requestBody, requestConfig);
            store.dispatch(addToastMessage('Requisicao Cancelada', SUCCESS_TOAST));
        } catch (error) {
            console.log(error);
            store.dispatch(addToastMessage(error.message, ERROR_TOAST));
        }

    }

    async _getRandomFuncionario() { 
        const requestConfig = getRequestConfigurations();
        const URL = `${ROOT_URL}/usuario/getRandFunc`;

        try {
            const response = await axios.get(URL, requestConfig);
            this.funcionario = response.data;
        } catch (error) {
            console.log(error);
            store.dispatch(addToastMessage(error.message, ERROR_TOAST));
        }
    }

    async save() {
        if(!this.destino) {
            store.dispatch(addToastMessage('Nenhum Destino Definido!', ERROR_TOAST));
            return false
        }
        if(!doesArrayExist(this.consumiveis)) {
            store.dispatch(addToastMessage('Nenhum Consumivel Requisitado', ERROR_TOAST));
            return false;
        }

        const requestConfig = getRequestConfigurations();
        const requestBody = JSON.stringify(this);
        const URL = `${ROOT_URL}/requisicao/addReq`;

        try {
            await axios.post(URL, requestBody, requestConfig);
            store.dispatch(addToastMessage('Requisicao Enviada', SUCCESS_TOAST));
            await store.dispatch(getAllConsumables());
            store.dispatch(update());
            return true;
        } catch (error) {
            console.log(error);
            store.dispatch(addToastMessage(error.message, ERROR_TOAST));
        }
    }
}

export default Requisicao;

//codigo	data_hora	destino	estado	codigo_docente	codigo_funcionario