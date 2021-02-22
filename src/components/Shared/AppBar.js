import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import exit from '../../resources/icons/exit.svg';
import profileImg from '../../resources/icons/profile.svg';
import { doesObjectExist, getFromLocalStorage, removeFromLocalStorage } from '../../utils/utils';
import { ADMIN_ACCOUNT, EMPLOYER_ACCOUNT, PROFESSOR_ACCOUNT, USER_LOCALSTORAGE } from '../../utils/constants';
import { Redirect } from 'react-router-dom';
import { setLoggedInUser, setManagedUser } from '../../actions/auth';
import Usuario from '../../model/Usuario';
import UpdatePersonalDataModal from './UpdatePersonalDataModal';

const AppBar = ({user, setLoggedInUser, setManagedUser}) => {

    const [state, setState] = useState({
        toExit: false,
        openEdit: false,
    });

    const {toExit, openEdit} = state;


    if (toExit) { 
        return <Redirect to="/"/>
    }

    let nome, spec;
    if (doesObjectExist(user)) { 
        nome = user.nome;
        if(user.typeUser === PROFESSOR_ACCOUNT) spec = user.cadeira;
        if(user.typeUser === EMPLOYER_ACCOUNT) spec = user.localizacao;
        if(user.typeUser === ADMIN_ACCOUNT) spec = user.departamento;
    }


    const exit = e => { 
        setState({...state, toExit: true});
        removeFromLocalStorage(USER_LOCALSTORAGE);
        setLoggedInUser({});
    }

    const openEditModal = e => {
        const toUpdate = {...getFromLocalStorage(USER_LOCALSTORAGE), type_account: user.typeUser};
        setManagedUser(new Usuario(toUpdate));
        setState({...state, openEdit: true})
    }

    const onCloseEditModal = e => { 
        setManagedUser(new Usuario());
        setState({...state, openEdit: false});
    }

    return (
        <div className="app-bar w-100 ">
            <div className="profile w-100 h-100 d-flex flex-row-reverse align-items-center ">
                <h5 className="d-inline-block mx-2 exit-icon" onClick={e => exit(e)}>
                    <i className="bi bi-box-arrow-right"></i>
                </h5> 
                <div className="profile-img">
                    <img src={profileImg} alt="profile picture"/>
                </div>                 
                <div className="profile-info  m-0 ">
                    <span className="username">{nome}</span>
                    <span className="info">{spec} | <span className="link-text d-inline" onClick={e => openEditModal(e) }>Editar</span> </span>
                </div>
            </div>
            <UpdatePersonalDataModal showModal={openEdit} onCloseModal={onCloseEditModal} />
        </div>
    )
}

AppBar.propTypes = {
    user: PropTypes.object,
    setLoggedInUser: PropTypes.func.isRequired,
    setManagedUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    setLoggedInUser,
    setManagedUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
