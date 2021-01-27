import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideNav from './Shared/SideNav'
import { ADMIN_ACCOUNT, ADMIN_PAGE, DASHBOARD_PAGE, EMPLOYER_ACCOUNT, PROFESSOR_ACCOUNT, USER_LOCALSTORAGE } from '../utils/constants'
import AdminMain from './Admin/AdminMain'
import ModelManagement from './Crud/ModelManagement'
import Usuario from '../model/Usuario'
import { login, setLoggedInUser, setManagedUser } from '../actions/auth'
import { setManagedConsumivel } from '../actions/admin'
import Consumivel from '../model/Consumivel'
import MainDocente from './Docente/MainDocente'
import MyRequestsPage from './Docente/MyRequestsPage'
import FuncionarioMain from './Funcionario/FuncionarioMain'
import { doesObjectExist, getFromLocalStorage } from '../utils/utils'
import { Redirect } from 'react-router-dom'

const MainPage = ({user, setManagedUser, setManagedConsumivel, login}) => {
    const [state, setState] = useState({ 
        page: DASHBOARD_PAGE, 
        toLogin: false,
    })

    const {page, toLogin} = state;


    useEffect(() => { 
        if (!doesObjectExist(user)){ 
            return setState({...state, toLogin: true})
        } 

        setManagedUser(new Usuario());
        setManagedConsumivel(new Consumivel());
        login();
    }, []);

    
    if (toLogin) return <Redirect to="/"/>;
    if (!doesObjectExist(user)) return <Redirect to="/"/>;

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
                {((page === DASHBOARD_PAGE) && (user.typeUser === EMPLOYER_ACCOUNT)) && <FuncionarioMain/>}
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
