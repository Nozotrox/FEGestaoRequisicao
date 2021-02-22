import React, { isValidElement, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '../Shared/AppBar'
import { getAllConsumables } from '../../actions/admin'
import { doesArrayExist } from '../../utils/utils'
import { ERROR_TOAST, MATERIAL_CONSUMIVEL, MAX_CONSUMABLES_TO_LOAD } from '../../utils/constants'
import { v4 } from 'uuid'
import CheckoutModal from './CheckoutModal'
import Requisicao from '../../model/Requisicao'
import { addToastMessage } from '../../actions/toast'

const MainDocente = ({flag, user, getAllConsumables, allConsumables, addToastMessage}) => {
    const [state, setState] = useState({
        min: 0,
        page: 1,
        filterName: '',
        type_consumivel: '',
        showModal: false,
    });

    const {min, page, filterName, showModal} = state;


    let consumablesList;
    let toLoad;
    let pageNumbers = [];
    useEffect(() => {
        getAllConsumables();
    }, [])

    if(doesArrayExist(allConsumables)){ 
        let isAvailable, doesReqContainsCons;
        let consumables = allConsumables;
        if (filterName) { 
            consumables = consumables.filter(consumable => consumable.nome.toLowerCase().startsWith(filterName.toLowerCase())) 
        }
        toLoad = consumables.filter((consumable, index) => (index >= min) && (index < (min + MAX_CONSUMABLES_TO_LOAD)));
        

        consumablesList = toLoad.map( consumable => { 
            isAvailable = consumable.disponivel;
            doesReqContainsCons = user.requisicao.contains(consumable);
            if (consumable.type_consumivel === MATERIAL_CONSUMIVEL) isAvailable = consumable.quantidade > 0;

            return <div key={v4()} className="row pTableRow py-2">
                        <div className="col text-truncate">
                            <span >{consumable.nome}</span>
                        </div>
                        <div className="col text-truncate">
                            <span>{consumable.descricao}</span>
                        </div>
                        <div className="col">
                            <span className={`badge ${consumable.type_consumivel === MATERIAL_CONSUMIVEL? "bg-primary":"bg-warning"}`}>{consumable.type_consumivel}</span>
                        </div>
                        <div className="col">
                            <span className={`${!isAvailable? "info-crum2-notavailable": "info-crum2-available"}`}>{!isAvailable? "indisponivel":"disponivel"}</span>
                        </div>
                        <div className="col">
                            <span className={`${isAvailable? "btn-table":"btn-table-disabled"} d-inline-block text-center add-btn ${doesReqContainsCons? "selected": ""}`} style={{minWidth: "7rem"}} onClick={e => addToRequest(consumable)}>
                                {!doesReqContainsCons?"Selecionar":"Selecionado"}
                            </span>
                            <span className={` ${doesReqContainsCons? "btn-table":"btn-table-disabled"} `} onClick={e => removeFromRequest(consumable)} >
                                Remover
                            </span>
                        </div>
                    </div>
        })

        const totalPages = Math.round(consumables.length / MAX_CONSUMABLES_TO_LOAD);

        for(let index = 1; index <= totalPages; index++) {
            pageNumbers.push(<li className={`page-item ${page === (index)? "active": ''}`}>
                                <a className="page-link" href="#">{index}<span className="sr-only"></span></a>
                            </li>)
        }

    }


    const onChange = e => { 
        const targetName = e.target.name;
        const targetValue = e.target.value;
        setState({...state, [targetName]: targetValue});
    }

    const next = () => { 
        const totalPages = Math.round(allConsumables.length / MAX_CONSUMABLES_TO_LOAD);
        if (page === totalPages) return;
        const newMin = (page + 1) * MAX_CONSUMABLES_TO_LOAD;
        setState({...state, page: page + 1, min: newMin});
    }

    const prev = () => {
        if(page === 0) return; 
        const newMin = (page - 1) * MAX_CONSUMABLES_TO_LOAD;
        setState({...state, page: page - 1, min: newMin});
    }

    const addToRequest = (consumable) => {
        if((!consumable) || (consumable.disponivel === false) || (consumable.quantidade === 0)) return;
        if (user.requisicao.consumiveis.length >= user.numero_requisicoes) return addToastMessage("Excedeu Limite de Materiais a Requisitar", ERROR_TOAST);
        user.requisicao.add(consumable);
    }

    const removeFromRequest = (consumable) => { 
        user.requisicao.remove(consumable);
    }

    const openCheckOutModal = () => { 
        setState({...state, showModal: true})
    }

    const closeCheckoutModal = (clear) => { 
        setState({...state, showModal: false});
        getAllConsumables();
        if (clear) {
            user.requisicao = new Requisicao(user);
        }
    }

    return (
        <div className="main-content d-flex flex-column">
            <AppBar/>
            <div className="content px-4">
                <div className="window-description w-100 py-4 px-4 d-flex justify-content-between ">
                    <div>
                        <h4>Catalogo De Consumiveis</h4>
                        <span className="info">Selecao de Consumiveis</span>
                    </div>
                    <div className="checkoutIcon  d-flex align-items-center" onClick={e => openCheckOutModal(e)}>
                        <span className={`material-icons ${doesArrayExist(user.requisicao.consumiveis)? "active": ""}`}>
                            assignment_turned_in
                        </span>
                    </div>
                </div>
                <div className="productsTable w-100  px-4 py-3">
                    <div className="filters porductsTableFilter form-row">
                        <div className="d-inline-block w-100">
                            <input type="text" className="form-control w-100 mb-2" style={{height: "30px"}} id="inlineFormInput" name="filterName" value={filterName} onChange={e => onChange(e)} placeholder="Procurar..."/>
                        </div>
                    </div>
                    <div className="productsTableContent w-100  mt-3">
                        <div className="row pTableHeader">
                            <div className="col">
                                <span>Nome</span>
                            </div>
                            <div className="col">
                                <span>Descricao</span>
                            </div>
                            <div className="col">
                                <span>Consumivel</span>
                            </div>
                            <div className="col">
                                <span>Disponibilidade</span>
                            </div>
                            <div className="col">
                                <span>Acção</span>
                            </div>
                        </div>
                        <div className="ptableContent my-3">
                            

                            {consumablesList}

                            <div className="d-flex my-4 justify-content-center">
                                <nav aria-label="...">
                                    <ul className="pagination">
                                    <li className={`page-item`}>
                                        <a className="page-link" href="#" tabindex="-1" onClick={e => prev(e)} >Previous</a>
                                    </li>
                                        {pageNumbers}
                                        <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => next(e)}>Next</a>
                                        </li>
                                    </ul>
                                    </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutModal closeModal={closeCheckoutModal} showModal={showModal} />
        </div>
    )
}

MainDocente.propTypes = {
    user: PropTypes.object,
    getAllConsumables: PropTypes.func.isRequired,
    allConsumables: PropTypes.array,
    flag: PropTypes.bool,
    addToastMessage: PropTypes.func,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    allConsumables: state.admin.allConsumables,
    flag: state.admin.flag,
})

const mapDispatchToProps = {
    getAllConsumables,
    addToastMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDocente)
