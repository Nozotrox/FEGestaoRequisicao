import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ADMIN_PAGE, DASHBOARD_PAGE, PROFESSOR_ACCOUNT } from '../../utils/constants'
import { doesObjectExist } from '../../utils/utils'

const SideNav = ({user, changePage, page}) => {
    let icon1 = "airplay";
    let icon2 = "admin_panel_settings";
    let typeUser = 'Admin';

    if (doesObjectExist(user)) { 
        if(user.typeUser === PROFESSOR_ACCOUNT) {
            icon1 = "design_services";
            icon2 = "reorder";
            typeUser = 'Docente';
        }
    }

    return (  
        <div className="side-nav d-flex flex-column align-items-center justify-items-center">
            <div className="side-nav-option side-nav-option-main  w-100 d-flex flex-column">
                <p>{typeUser}</p>
            </div> 
            <div name={DASHBOARD_PAGE} className={`side-nav-option side-nav-option-others ${page === DASHBOARD_PAGE? 'active-sn': ''}  w-100 d-flex flex-column`} onClick={e => changePage(e)}>
                <span name={DASHBOARD_PAGE} className="material-icons">
                    {icon1}
                </span>
            </div>
            <div name={ADMIN_PAGE} className={`side-nav-option side-nav-option-others ${page === ADMIN_PAGE? 'active-sn':''}  w-100 d-flex flex-column`} onClick={e => changePage(e)}>
                <span name={ADMIN_PAGE} className="material-icons">
                    {icon2}
                </span>
            </div>
        </div>
    )
}

SideNav.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
