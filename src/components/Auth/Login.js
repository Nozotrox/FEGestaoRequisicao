import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login }  from '../../actions/auth'
import { addToastMessage } from '../../actions/toast'
import { doesInputTextFieldValueExist } from '../../utils/utils'
import { ERROR_TOAST } from '../../utils/constants'

const Login = ({user, login, addToastMessage}) => {
    const [state, setState] = useState({
        contact: '',
        password: ''
    });

    const {contact, password} = state;

    const onChange = (e) => { 
        const targetName = e.target.name;
        const targetValue = e.target.value;
        setState({...state, [targetName]: targetValue});
    }

    const verify = () => {
        const message =  'Preencha os Campos Necessarios';
        if (doesInputTextFieldValueExist(contact)) return true;
        if (doesInputTextFieldValueExist(password)) return true;

        addToastMessage(message, ERROR_TOAST);
        return false;
    }

    const onSubmit = (e) => { 
        const areFieldsFilled = verify();
        if(areFieldsFilled) {
            login(contact, password);
        }
        
    }


    return (
        <div id="login-background" className="w-100 h-100">
            <div className="overlay"></div>
            <div className="login-box">
                <form>
                    <h1 className="text-center my-4"> Login </h1>
                    <div className="mb-3">
                        <label htmlFor="email_or_contact" className="form-label info-msg mandatory">Email/Contacto: </label>
                        <input type="text" name="contact" value={contact} onChange={e => onChange(e)} className="form-control" id="email_or_contact"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label info-msg mandatory">Password: </label>
                        <input type="password" name="password" value={password} onChange={e => onChange(e)} className="form-control" id="passwordInput"/>
                        <small id="forgot-password" className="form-text text-muted">Esqueci a minha palavra passe.</small>

                    </div>
                    <div className="mb-3 mt-4 d-flex justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={e => onSubmit(e)}>Login</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

Login.propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    addToastMessage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state,
})

const mapDispatchToProps = {
    login,
    addToastMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
