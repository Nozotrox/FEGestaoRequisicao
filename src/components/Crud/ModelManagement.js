import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '../Shared/AppBar'
import AddEditUserForm from './AddEditUserForm'
import { getAllUsers, setManagedUser } from '../../actions/auth'
import { checkTypeUser, doesArrayExist } from '../../utils/utils'
import { EMPLOYER_ACCOUNT, MATERIAL_CONSUMIVEL, PROFESSOR_ACCOUNT } from '../../utils/constants';
import ConfirmModal from '../Shared/ConfirmModal'
import { v4 } from 'uuid'
import Usuario from '../../model/Usuario'
import AddEditConsumivelForm from './AddEditConsumivelForm'
import userLogo from '../../resources/icons/profile.svg'
import toolsLogo from '../../resources/icons/tool.svg'
import { getAllConsumables, setManagedConsumivel } from '../../actions/admin'
import Consumivel from '../../model/Consumivel'

const ModelManagement = ({allUsers, allConsumables, getAllUsers, setManagedUser, activeUser, activeConsumable, getAllConsumables, setManagedConsumivel}) => {
    const [state, setState] = useState({
        diplayModal: false,
    });

    const {displayModal} = state;

    useEffect(() => { 
        getAllUsers();
        getAllConsumables();
    }, []);


    const onChangeModalDisplay = (e, value) => { 
        setState({...state, displayModal: value});
    }

    let allUsersList;
    if (doesArrayExist(allUsers)) { 
        let typeUser;
        allUsersList = allUsers.map(user => { 
            typeUser = checkTypeUser(user);
            return <div key={v4()} className="admin-table-row d-flex justify-content-between py-2 px-3">
                        <div className=" w-50">
                            <span className="consumable-name d-inline-block w-50 ">
                                {user.nome}  
                                
                            </span>
                            <span className={`badge ${typeUser === PROFESSOR_ACCOUNT? 'bg-primary': typeUser === EMPLOYER_ACCOUNT? 'bg-info': 'bg-warning'}`}>
                                {typeUser === PROFESSOR_ACCOUNT? 'Docente': typeUser === EMPLOYER_ACCOUNT? 'Funcionario': 'Admin'}
                            </span>
                        </div>
                        <div>
                            <span className="btn-table add-btn" onClick={e => editUser(user)}>
                                Editar
                            </span>
                            <span className="btn-table" onClick={e => onRemoveUser(user)}>
                                Remover
                            </span>
                        </div>
                    </div>

        })
    }

    let allConsumablesList;
    if (doesArrayExist(allConsumables)) { 
        allConsumablesList = allConsumables.map(consumable => { 
            return <div class="admin-table-row d-flex justify-content-between py-3 px-3">
                        <div className="d-flex align-items-center w-50">
                            <span class="consumable-name text-truncate  w-50">
                                {consumable.nome}
                            </span>
                            <span class="info-msg w-50 text-truncate d-inline-block ">
                                {consumable.descricao}
                            </span>
                            <span className={`badge ${consumable.dtype === MATERIAL_CONSUMIVEL? 'bg-primary': 'bg-warning'}`}>
                                {consumable.dtype}
                            </span>
                        </div>
                        <div>
                            <span class="btn-table add-btn" onClick={e => editConsumable(consumable)}>
                                Editar
                            </span>
                            <span class="btn-table" onClick={e => onRemoveConsumivel(consumable)}>
                                Remover
                            </span>
                        </div>
                    </div>
        });
    }

    const editUser = (user) => { 
        setManagedUser(user);
    }

    const editConsumable = (consumable) => { 
        setManagedConsumivel(consumable);
    }

    const onRemoveConsumivel = consumivel => { 
        setManagedConsumivel(consumivel);
        onChangeModalDisplay(undefined, true);
    }

    const onRemoveUser = (user) => { 
        setManagedUser(user);
        onChangeModalDisplay(undefined, true);
    }

    const onConfirmDeleteUser = (e) => { 
        activeUser.delete();
        setManagedUser(new Usuario());
        onChangeModalDisplay(undefined, false);
        getAllUsers();
    }

    const onConfirmDeleteConsumivel = e => { 
        activeConsumable.delete();
        setManagedConsumivel(new Consumivel());
        onChangeModalDisplay(undefined, false);
        getAllConsumables();
    }

    const onCancelRemoveUser = (e) => { 
        setManagedUser(new Usuario());
        onChangeModalDisplay(undefined, false);
    }

    const onCancelRemoveConsumable = e => { 
        setManagedConsumivel(new Consumivel());
        onChangeModalDisplay(undefined, false);
    }

    const denyAction = !activeUser.newUser? onCancelRemoveUser:onCancelRemoveConsumable;
    const confirmAction = !activeUser.newUser? onConfirmDeleteUser:onConfirmDeleteConsumivel;


    return (
        <div className="main-content d-flex flex-column">
            <AppBar/>
            <div className="content admin-content">
                <div className="w-100 py-4 px-4">
                <h4 className="my-4">Usuarios</h4>
                    <div className="row admin-panel">
                        <div className="col-4">
                            <AddEditUserForm/>
                        </div>
                        <div className="col-8">
                            <div className="dash-table">
                                <div className="dash-table-header  d-flex justify-content-between">
                                    <span>
                                        <img src={userLogo} alt="userLogog" />
                                        Usuarios
                                    </span>
                                </div>
                                <div className="dash-content">
                                    {allUsersList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 py-4 px-4">
                    <h4 className="my-4">Consumiveis</h4>
                    <div class="row admin-panel">
                        <div class="col-4">
                            <AddEditConsumivelForm/>
                        </div>
                        <div class="col-8">
                            <div class="dash-table">
                                <div class="dash-table-header  d-flex justify-content-between">
                                    <span>
                                        <img src={toolsLogo} />
                                        Consumiveis
                                    </span>
                                </div>
                                <div class="dash-content">
                                    {allConsumablesList}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>








                <ConfirmModal displayModal={displayModal} denyAction={denyAction} confirmAction={confirmAction} />


            </div>
        </div>
    )
}

ModelManagement.propTypes = {
    allUsers: PropTypes.array,
    getAllUsers: PropTypes.func.isRequired,
    setManagedUser: PropTypes.func.isRequired,
    activeUser: PropTypes.object,
    activeConsumable: PropTypes.object,
    getAllConsumables: PropTypes.func.isRequired,
    allConsumables: PropTypes.array,
    setManagedConsumivel: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    allUsers: state.auth.allUsers,
    activeUser: state.auth.mUser,
    allConsumables: state.admin.allConsumables,
    activeConsumable: state.admin.mConsumivel,

})

const mapDispatchToProps = {
    getAllUsers,
    setManagedUser,
    getAllConsumables,
    setManagedConsumivel,
}


export default connect(mapStateToProps, mapDispatchToProps)(ModelManagement)
