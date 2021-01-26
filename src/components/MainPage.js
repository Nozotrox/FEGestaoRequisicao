import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideNav from './Shared/SideNav'
import { ADMIN_ACCOUNT, ADMIN_PAGE, DASHBOARD_PAGE, PROFESSOR_ACCOUNT } from '../utils/constants'
import AdminMain from './Admin/AdminMain'
import ModelManagement from './Crud/ModelManagement'
import Usuario from '../model/Usuario'
import { login, setManagedUser } from '../actions/auth'
import { setManagedConsumivel } from '../actions/admin'
import Consumivel from '../model/Consumivel'
import MainDocente from './Docente/MainDocente'
import MyRequestsPage from './Docente/MyRequestsPage'

const MainPage = ({user, setManagedUser, setManagedConsumivel, login}) => {
    const [state, setState] = useState({ 
        page: ADMIN_PAGE, 
    })

    const {page} = state;

    useEffect(() => { 
        setManagedUser(new Usuario());
        setManagedConsumivel(new Consumivel());
        login();
    }, []);

    const onChangePage = (e) => { 
        const pageName = e.target.getAttribute('name');
        setState({...state, page: pageName});
    }


    return (
        <div className="row w-100 h-100">
            <div className="col-12  no-pad-right  d-flex">
                <SideNav page={page} changePage={onChangePage} />
                {((page === DASHBOARD_PAGE) && (user.typeUser === ADMIN_ACCOUNT)) && <AdminMain/>}
                {((page === ADMIN_PAGE) && (user.typeUser === ADMIN_ACCOUNT)) && <ModelManagement/>}
                {((page === DASHBOARD_PAGE) && (user.typeUser === PROFESSOR_ACCOUNT)) && <MainDocente/>}
                {((page === ADMIN_PAGE) && (user.typeUser === PROFESSOR_ACCOUNT)) && <MyRequestsPage/>}
            </div>
        </div>
    )
}

MainPage.propTypes = {
    setManagedUser: PropTypes.func.isRequired,
    setManagedConsumivel: PropTypes.func.isRequired,
    login: PropTypes.func,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    setManagedUser,
    setManagedConsumivel,
    login,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
