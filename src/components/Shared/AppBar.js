import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import exit from '../../resources/icons/exit.svg';
import profileImg from '../../resources/icons/profile.svg';
import { doesObjectExist } from '../../utils/utils';
import { PROFESSOR_ACCOUNT } from '../../utils/constants';

const AppBar = ({user}) => {

    let nome, spec;
    if(doesObjectExist(user)) { 
        nome = user.nome;
        if(user.typeUser === PROFESSOR_ACCOUNT) spec = user.cadeira;
    }
    return (
        <div className="app-bar w-100 ">
            <div className="profile w-100 h-100 d-flex flex-row-reverse align-items-center ">
                <h5 className="d-inline-block mx-2">
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
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
