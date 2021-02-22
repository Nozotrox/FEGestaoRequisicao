import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, setLoggedInUser }  from '../../actions/auth'
import { addToastMessage } from '../../actions/toast'
import { doesInputTextFieldValueExist, getFromLocalStorage } from '../../utils/utils'
import { ERROR_TOAST, USER_LOCALSTORAGE } from '../../utils/constants'
import { Redirect } from 'react-router-dom'
import Usuario from '../../model/Usuario'

const Login = ({user, login, addToastMessage, setLoggedInUser}) => {
    const [state, setState] = useState({
        contact: '',
        password: '',
        loggedIn: false,
        forgotPassword: false,
    });

    useEffect(() => { 
        const localStorageUser = getFromLocalStorage(USER_LOCALSTORAGE);
        if (localStorageUser) { 
            const savedUser = new Usuario(localStorageUser);
            setLoggedInUser(savedUser);
            setState({...state, loggedIn: true})
        }
    }, [])

    const {contact, password, loggedIn, forgotPassword} = state;

    if(loggedIn) { 
        return <Redirect to="/main"/>
    }

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

    const onSubmit = async (e) => { 
        const areFieldsFilled = verify();
        let result;
        if (areFieldsFilled) result = await login(contact, password);

        if(result) setState({...state, loggedIn: true})
        
    }

    const onRecoverPassword =  (e) => { 

    }


    return (
        <div id="login-background" className="w-100 h-100">
            <div className="overlay"></div>
            <div className="login-box">
                {!forgotPassword && <form>
                    <h1 className="text-center my-4"> Login </h1>
                    <div className="mb-3">
                        <label htmlFor="email_or_contact" className="form-label info-msg mandatory">Email/Contacto: </label>
                        <input type="text" name="contact" value={contact} onChange={e => onChange(e)} className="form-control" id="email_or_contact"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label info-msg mandatory">Password: </label>
                        <input type="password" name="password" value={password} onChange={e => onChange(e)} className="form-control" id="passwordInput"/>
                        {/* <small id="forgot-password" className="form-text text-muted">Esqueci a minha palavra passe.</small> */}

                    </div>
                    <div className="mb-3 mt-4 d-flex justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={e => onSubmit(e)}>Login</button>
                    </div>
                </form>}

                {forgotPassword && 
                <form>
                    <h1 className="text-center my-4"> Login </h1>
                    <p class="text-center text-muted text-small"> Apoos introduzir o contacto, diriga-se ao DIC para obter o seu novo password.</p>
                    <div className="mb-3">
                        <label htmlFor="email_or_contact" className="form-label info-msg mandatory">Email/Contacto: </label>
                        <input type="text" name="contact" value={contact} onChange={e => onChange(e)} className="form-control" id="email_or_contact"/>
                    </div>
                    <div className="mb-3 mt-4 d-flex justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={e => onSubmit(e)}>Recuperar</button>
                    </div>
                </form>}

            </div>
        </div>
    )
}

Login.propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    addToastMessage: PropTypes.func.isRequired,
    setLoggedInUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    login,
    addToastMessage,
    setLoggedInUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
