import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '../Shared/AppBar'
import { doesArrayExist, doesObjectExist, getMomentFromString, getRequestStateColor } from '../../utils/utils'
import { ESTADO_REQ_CANCELADA, ESTADO_REQ_CONFIRMADA, ESTADO_REQ_INDISPONIVEL, ESTADO_REQ_NOVA, ESTADO_REQ_TERMINADA, MATERIAL_CONSUMIVEL } from '../../utils/constants'
import moment from 'moment';

const MyRequestsPage = ({flag, user}) => {

    let requests, stateColor, reqState;
    if (doesObjectExist(user) && doesArrayExist(user.requests)) { 
        requests = user.requests.map(request => { 
            stateColor = getRequestStateColor(request);
            reqState = request.estado;
            return <div className="card mx-2 my-2">
                        <div className="card-body">
                            <span className={`badge bg-${stateColor} state mb-2`}>{reqState}</span>
                            <p>{/*<span className="desteny">Destino:</span>*/} {request.destino}</p>
                            <p>{/*<span className="dateTime">Hora: </span>*/} {moment(request.dataHora).format("HH:mm")} </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            {request.consumiveis.map(cons => { 
                                return  <li className="list-group-item d-flex justify-content-between">
                                            <span className="text-truncate w-50">{cons.consumivel.nome}</span>
                                            <span className="badge bg-secondary">{cons.quantidade}x</span>
                                            <span className={`${cons.consumivel.dtype === MATERIAL_CONSUMIVEL? "badge bg-primary": "badge bg-warning"}`}>{cons.consumivel.dtype}</span>
                                        </li>
                            })}
                        </ul>
                        <div className="card-body">
                            <span className={`${((reqState !== ESTADO_REQ_NOVA) && (reqState !== ESTADO_REQ_CONFIRMADA))? "btn-table-disabled":"btn-table"} d-block text-center`} onClick={e => cancelar(request)}>
                                Cancelar
                            </span>
                        </div>
                    </div>
        })
    }

    const cancelar = async (request) => { 
        const reqState = request.estado;
        const isToNotSend = (reqState === ESTADO_REQ_CANCELADA) || (reqState === ESTADO_REQ_INDISPONIVEL) || (reqState === ESTADO_REQ_TERMINADA);
        if (isToNotSend) return;
        request.set('estado', ESTADO_REQ_CANCELADA);
        await request.update();
        user.getMyRequests();
    }

    return (
        <div className="main-content  d-flex flex-column">
                    <AppBar/>
                    <div className="content px-4">
                        <div className="window-description w-100 py-4 px-4 d-flex justify-content-between ">
                            <div>
                                <h4>Minhas Requisicoes</h4>
                                <span className="info">Requisicoes Do Dia Feita Pelo Docente</span>
                            </div>
                        </div>
                        <div className="card-deck userRequests overflow-y">
                            {requests}
                        </div>

                    </div>
                </div>
    )
}

MyRequestsPage.propTypes = {
    user: PropTypes.object,
    flag: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    flag: state.admin.flag,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsPage);
