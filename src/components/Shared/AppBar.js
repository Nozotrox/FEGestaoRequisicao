import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import exit from '../../resources/icons/exit.svg';
import profileImg from '../../resources/icons/profile.svg';
import { doesObjectExist, removeFromLocalStorage } from '../../utils/utils';
import { EMPLOYER_ACCOUNT, PROFESSOR_ACCOUNT, USER_LOCALSTORAGE } from '../../utils/constants';
import { Redirect } from 'react-router-dom';
import { setLoggedInUser } from '../../actions/auth';

const AppBar = ({user, setLoggedInUser}) => {

    const [state, setState] = useState({
        toExit: false,
    });

    const {toExit} = state;


    if (toExit) { 
        return <Redirect to="/"/>
    }

    let nome, spec;
    if (doesObjectExist(user)) { 
        nome = user.nome;
        if(user.typeUser === PROFESSOR_ACCOUNT) spec = user.cadeira;
        if(user.typeUser === EMPLOYER_ACCOUNT) spec = user.localizacao;
    }


    const exit = e => { 
        setState({...state, toExit: true});
        removeFromLocalStorage(USER_LOCALSTORAGE);
        setLoggedInUser({});
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
                    <span className="info">{spec}</span>
                </div>
            </div>
        </div>
    )
}

AppBar.propTypes = {
    user: PropTypes.object,
    setLoggedInUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    setLoggedInUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
