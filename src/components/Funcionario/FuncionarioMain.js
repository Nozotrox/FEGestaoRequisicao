import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '../Shared/AppBar'
import { doesArrayExist, doesObjectExist, getRequestStateColor } from '../../utils/utils'
import moment from 'moment';
import { ESTADO_REQ_CANCELADA, ESTADO_REQ_INDISPONIVEL, ESTADO_REQ_CONFIRMADA, MATERIAL_CONSUMIVEL, ESTADO_REQ_NOVA, ESTADO_REQ_TERMINADA } from '../../utils/constants'
import Usuario from '../../model/Usuario'
import { v4 } from 'uuid'

const FuncionarioMain = ({flag, user}) => {

    let requests;
    if (doesObjectExist(user) && doesArrayExist(user.requests)) { 
        requests = user.requests.map(request => { 
            return <div key={v4()} className={`card mx-2 my-2 ${((request.estado === ESTADO_REQ_CANCELADA) || (request.estado === ESTADO_REQ_INDISPONIVEL) || (request.estado === ESTADO_REQ_TERMINADA))? "fadee-box":""}`}>
                        <div className="card-body">
                            {((request.estado === ESTADO_REQ_CANCELADA) || (request.estado === ESTADO_REQ_INDISPONIVEL) || (request.estado === ESTADO_REQ_TERMINADA)) && <span className={`badge ${(request.estado === ESTADO_REQ_INDISPONIVEL)? "bg-warning":"bg-danger"} state mb-2`}>{(request.estado === ESTADO_REQ_CANCELADA)? "Cancelado": (request.estado === ESTADO_REQ_INDISPONIVEL)? "Indisponivel": "Terminado"}</span>}
                            <p>{/*<span className="desteny">Destino:</span>*/} {request.destino}</p>
                            <p>{/*<span className="dateTime">Hora: </span>*/} {moment(request.dataHora).fromNow()} </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            {request.consumiveis.map(cons => { 
                                return  <li className="list-group-item d-flex justify-content-between">
                                            <span  className="text-truncate w-50">{cons.consumivel.nome}</span>
                                            <span className="badge bg-secondary">{cons.quantidade}x</span>
                                            <span className={`${cons.consumivel.dtype === MATERIAL_CONSUMIVEL? "badge bg-primary": "badge bg-warning"}`}>{cons.consumivel.dtype}</span>
                                        </li>
                            })}
                        </ul>
                        <div className="card-body d-flex justify-content-center">
                            
                            {((request.estado === ESTADO_REQ_NOVA) || (request.estado === ESTADO_REQ_CONFIRMADA)) && <span className={`${request.estado === ESTADO_REQ_NOVA?"btn-table":"btn-table-disabled"} add-btn d-inline-block w-100 text-center `} onClick={e => confirmar(request)} >
                                {request.estado === ESTADO_REQ_CONFIRMADA? "Confirmado":"confirmar"}
                            </span>}
                            {((request.estado !== ESTADO_REQ_CANCELADA) && (request.estado !== ESTADO_REQ_INDISPONIVEL) && (request.estado !== ESTADO_REQ_TERMINADA)) && <span className="btn-table d-inline-block w-100 text-center" onClick={e => cancelar(request)}>
                                {request.estado === ESTADO_REQ_CONFIRMADA? "Terminar":"Indsiponivel"}
                            </span>}
                        </div>
                    </div>
        })
    }

    const confirmar = async request => {
        if (request.estado !== ESTADO_REQ_NOVA) return;
        request.set('estado', ESTADO_REQ_CONFIRMADA);
        const usuario = new Usuario();
        usuario.copy(user);
        request.set('funcionario', usuario);
        await request.update();
        user.getRequests();
    }

    const cancelar = async (request) => { 
        const estado = request.estado === ESTADO_REQ_CONFIRMADA? ESTADO_REQ_TERMINADA : ESTADO_REQ_INDISPONIVEL;
        request.set('estado', estado);
        await request.update();
        user.getRequests();
    }

    return (
        <div className="main-content d-flex flex-column">
            <AppBar/>
            <div className="content px-4">
                <div className="window-description w-100 py-4 px-4 d-flex justify-content-between ">
                    <div>
                        <h4>Catalogo De Consumiveis</h4>
                        <span className="info">Selecao de Consumiveis</span>
                    </div>
                </div>
                <div className="card-columns userRequests overflow-y">
                    {requests}
                </div>
            </div>

        </div>
    )
}

FuncionarioMain.propTypes = {
    user: PropTypes.object,
    flag: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    flag: state.admin.flag,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FuncionarioMain)
