import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getConsReqCount } from '../../actions/admin'
import { doesObjectExist } from '../../utils/utils'
import profileDashIcon from '../../resources/icons/profile.svg';
import toolIcon from '../../resources/icons/tool.svg';
import serviceIcon from '../../resources/icons/service.svg';

const DashboardTables = ({user, consReq, getConsReqCount}) => {

    useEffect(() => { 
        getConsReqCount(user.email, user.password)
    }, []);

    let materials = [], services = [], requests = [];

    const loadConsumables = () => {         
        if(doesObjectExist(consReq)) {
            const materialsList = consReq.consumables[0]; 
            const servicesList = consReq.consumables[1]; 
            
            materials = Object.keys(materialsList).map(materialName => { 
                return <div className="dash-table-row d-flex justify-content-between">
                            <span> {materialName} </span>
                            <span className="info">{materialsList[materialName]}</span>
                        </div>
            });

            services = Object.keys(servicesList).map(serviceName => { 
                return <div className="dash-table-row d-flex justify-content-between">
                            <span> {serviceName} </span>
                            <span className={`${servicesList[serviceName]?'info-crum-available':'info-crum-notavailable'}`}>{servicesList[serviceName]? "disponivel": "indisponivel"}</span>
                        </div>
            })

            requests = consReq.requests.map(request => { 
                return <div className="dash-table-request-row d-flex justify-content-between py-2">
                            <div className="prof-icon">
                               <img src={profileDashIcon} alt="profileDashIcon" className="mx-2" />
                                {`${request.docente.nome} | `}
                                <span className="info-msg">{request.destino}</span>
                            </div>
                            <div className="mx-3 mat-icon">
                                    <img src={toolIcon} alt="toolIcon" className="mx-2"/>
                                    {request.consumiveis.length}
                                {/* <span className="v-divisor"></span>
                                <span className="consumable-count">
                                    <img src="resources/icons/service.svg"/>
                                    1
                                </span> */}
                            </div>
                        </div>
            })
        }
    }

    loadConsumables();

    return (
        <div className="row px-4 py-4">
            <div className="col-3 dash-table mx-1 p-0">
                <div className="dash-table-header  d-flex justify-content-between">
                    <span className="d-flex align-items-center">
                        <img src={toolIcon} alt="toolIcon"/>
                        Materiais
                    </span>
                    <span className="info">{materials.length}</span>
                </div>
                <div className="dash-content">
                    {materials}
                </div>
            </div>
            <div className="col-3 dash-table mx-1 p-0">
                <div className="dash-table-header  d-flex justify-content-between">
                    <span>
                        <img src={serviceIcon} alt="serviceIcon" />
                        Servicos
                    </span>
                    <span className="info">{services.length}</span>
                </div>
                <div className="dash-content">
                    {services}
                </div>
            </div>
            <div className="col dash-table mx-1 p-0">
                <div className="dash-table-header  d-flex justify-content-between">
                    <span>
                        <img src={serviceIcon} alt="serviceIcon" />
                        Requisicoes
                    </span>
                    <span className="info">{requests.length}</span>
                </div>
                <div className="dash-content">
                    {requests}
                </div>
                
            </div>
        </div>
    )
}

DashboardTables.propTypes = {
    user: PropTypes.object,
    consReq: PropTypes.object,
    getConsReqCount: PropTypes.func,

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    consReq: state.admin.consReq,
})

const mapDispatchToProps = {
    getConsReqCount,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTables)
