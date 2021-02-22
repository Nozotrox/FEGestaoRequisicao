import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ADMIN_ACCOUNT, EMPLOYER_ACCOUNT, FEMININO, MASCULINO, NAO_BINARIO, PROFESSOR_ACCOUNT } from '../../utils/constants';
import { getAllUsers, setManagedUser } from '../../actions/auth';
import Usuario from '../../model/Usuario';
import { validate } from 'uuid';

const AddEditUserForm = ({flag, mUser, setManagedUser, getAllUsers, hideTitle}) => {

    const {p_nome, apelido, contacto, email, genero, numero_requisicoes, password, password_2, localizacao, departamento, type_account, cadeira, newUser} = mUser;


    const onChange = e => { 
        const targetName = e.target.name;
        const targetValue = e.target.value;
        mUser.set(targetName, targetValue);
    }

    const onChangeCheckBox = (e, field) => { 
        const targetName = e.target.name;
        mUser.set(field, targetName);
    }

    const clear = () => { 
        setManagedUser(new Usuario());
    }



    const saveUser = async () => { 
        await mUser.save();
        setManagedUser(new Usuario());
        getAllUsers();
    }

    return (
        <div className="dash-table">
            { !hideTitle && <div className="dash-table-header text-center">
                <h5>Adicionar/Editar</h5>
            </div>}
            <div className="dash-content px-4 py-4">
                <form>
                    <p className="text-center">Dados Pessoais</p>
                    <div className="mb-3">
                        <label htmlFor="user_name" className="form-label info-msg mandatory">Nome: </label>
                        <input type="text" className="form-control" name="p_nome" id="user_name" value={p_nome} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label info-msg mandatory">Apelido: </label>
                        <input type="text" className="form-control" id="surname" name="apelido" value={apelido} onChange={e => onChange(e)} />
                    </div>

                    <div className="mb-3">
                        <label className="d-block mandatory">Genero: </label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={MASCULINO} id="masculinoGen" onChange={e => onChangeCheckBox(e, 'genero')} checked={genero === MASCULINO} />
                            <label className="form-check-label" htmlFor="masculinoGen">
                                Masculino
                            </label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={FEMININO} id="femininoGen" checked={genero === FEMININO} onChange={e => onChangeCheckBox(e, 'genero')} />
                            <label className="form-check-label" htmlFor="femininoGen">
                                Feminino
                            </label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={NAO_BINARIO} id="naobinarioGen" checked={genero === NAO_BINARIO} onChange={e => onChangeCheckBox(e, 'genero')} />
                            <label className="form-check-label" htmlFor="naobinarioGen">
                                Nao binario
                            </label>
                            </div>
                    </div>

                    <span className="h-divisor mb-4"></span>
                    <p className="text-center"> Dados da Conta </p>
                    <div className="mb-3">
                        <label htmlFor="numero_contact" className="form-label info-msg mandatory"> Numero de Contacto: </label>
                        <input type="text" className="form-control" id="numero_contact" name="contacto" value={contacto} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user_email" className="form-label info-msg">Email: </label>
                        <input type="email" className="form-control" id="user_email" name="email" value={email} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user_password" className="form-label info-msg mandatory">Password: </label>
                        <input type="password" className="form-control" id="user_password" name="password" value={password} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user_password_confirm" className="form-label info-msg mandatory"> Confirmar Password: </label>
                        <input type="password" className="form-control" id="user_password_confirm" name="password_2" value={password_2} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label className="d-block mandatory">Tipo de conta: </label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={ADMIN_ACCOUNT} id="typeAccount" checked={type_account === ADMIN_ACCOUNT} onChange={e => onChangeCheckBox(e, 'type_account')} disabled={!newUser} />
                            <label className="form-check-label" htmlFor="typeAccount">
                                Admin
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={PROFESSOR_ACCOUNT} id="flexRadioDocente" checked={type_account === PROFESSOR_ACCOUNT} onChange={e => onChangeCheckBox(e, 'type_account')} disabled={!newUser} />
                            <label className="form-check-label" htmlFor="flexRadioDocente">
                                Docente
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={EMPLOYER_ACCOUNT} id="flexRadioWorker" checked={type_account === EMPLOYER_ACCOUNT} onChange={e => onChangeCheckBox(e, 'type_account')} disabled={!newUser} />
                            <label className="form-check-label" htmlFor="flexRadioWorker">
                                Funcionario
                            </label>
                        </div>
                    </div>

                    {(type_account === PROFESSOR_ACCOUNT) && <Fragment>
                        <div className="mb-3">
                            <label htmlFor="cadeira_smth" className="form-label info-msg mandatory">Cadeira: </label>
                            <input type="text" className="form-control" id="cadeira_smth" name="cadeira" value={cadeira} onChange={e => onChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numero_requisicoes_smth" className="form-label info-msg mandatory">Numero de Requisicoes: </label>
                            <input type="number" className="form-control" id="numero_requisicoes_smth" name="numero_requisicoes" value={numero_requisicoes} onChange={e => onChange(e)} />
                        </div>
                    </Fragment>}

                    {(type_account === EMPLOYER_ACCOUNT) && <div className="mb-3">
                        <label htmlFor="location_smth" className="form-label info-msg mandatory">Localizacao: </label>
                        <input type="text" className="form-control" id="location_smth" name="localizacao" value={localizacao} onChange={e => onChange(e)} />
                    </div>}

                    {(type_account === ADMIN_ACCOUNT) &&  <div className="mb-3">
                        <label htmlFor="department_smth" className="form-label info-msg mandatory">Departamento: </label>
                        <input type="text" className="form-control" id="department_smth" name="departamento" value={departamento} onChange={e => onChange(e)} />
                    </div>}
                    
                </form> 
                {!hideTitle && <div>
                    <button type="button" className="btn btn-primary" onClick={e => saveUser()}>{newUser? "Adicionar":"Editar"}</button>
                    <button type="button" className="btn btn-light mx-4" onClick={e => clear()} >Limpar</button>
                </div>}
            </div>
        </div>
                                
    )
}

AddEditUserForm.propTypes = {
    mUser: PropTypes.object,
    flag: PropTypes.bool.isRequired,
    setManagedUser: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    mUser: state.auth.mUser,
    flag: state.admin.flag,
})

const mapDispatchToProps = {
    setManagedUser,
    getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditUserForm)
