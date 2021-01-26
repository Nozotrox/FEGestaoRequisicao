import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getConsReqCount, getUserCount } from '../../actions/admin'
import { doesObjectExist } from '../../utils/utils';
import dashIcon from '../../resources/icons/show_chart.png'

const DashboardBoxes = ({user, userCount, consReq, getUserCount}) => {

    
    useEffect(() => { 
         getUserCount(user.email, user.password);
    }, []);

    return (
        <Fragment>
            <div className="window-description w-100 py-4 px-4 ">
                <h4>Dashboard</h4>
                <span className="info">Informacoes Sobre As requisicoes e usuarios</span>
            </div>
            <div className="window-dashboard px-4 py-4 row"> 
                <div className="col dash-box d-flex mx-1"> 
                    <div className="dash-box-icon px-4 d-flex flex-row align-items-center ">
                        <img src={dashIcon} alt="dashIcon" />
                    </div>
                    <div className="dash-box-info d-flex flex-row align-items-center">
                        <div className="py-3">
                            <h3>{userCount.total_usuarios || '-'}</h3>
                            <span className="info-msg">Total Usuarios</span>
                        </div>
                    </div>
                </div>
                <div className="col dash-box d-flex mx-1"> 
                    <div className="dash-box-icon px-4 d-flex flex-row align-items-center ">
                    <img src={dashIcon} alt="dashIcon" />
                    </div>
                    <div className="dash-box-info d-flex flex-row align-items-center">
                        <div className="py-3">
                            <h3>{userCount.total_docentes || '-'}</h3>
                            <span className="info-msg">Docentes</span>
                        </div>
                    </div>
                </div>
                <div className="col dash-box d-flex mx-1"> 
                    <div className="dash-box-icon px-4 d-flex flex-row align-items-center ">
                        <img src={dashIcon} alt="dashIcon" />
                    </div>
                    <div className="dash-box-info d-flex flex-row align-items-center">
                        <div className="py-3">
                            <h3>{userCount.total_requisicoes || '-'}</h3>
                            <span className="info-msg">Requisicoes</span>
                        </div>
                    </div>
                </div>
                <div className="col dash-box d-flex mx-1"> 
                    <div className="dash-box-icon px-4 d-flex flex-row align-items-center ">
                    <img src={dashIcon} alt="dashIcon" />
                    </div>
                    <div className="dash-box-info d-flex flex-row align-items-center">
                        <div className="py-3">
                            <h3>{userCount.total_funcionarios || '-'}</h3>
                            <span className="info-msg">Funcionarios</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

DashboardBoxes.propTypes = {
    userCount: PropTypes.object,
    consReq : PropTypes.object,
    getUserCount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    userCount: state.admin.userCount,
    consReq: state.admin.consReq,
    user: state.auth.user,
})

const mapDispatchToProps = {
    getUserCount
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBoxes)
