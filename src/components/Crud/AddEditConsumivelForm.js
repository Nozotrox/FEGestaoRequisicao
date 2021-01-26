import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllConsumables, setManagedConsumivel } from '../../actions/admin'
import Consumivel from '../../model/Consumivel'
import { MATERIAL_CONSUMIVEL, SERVICO_CONSUMIVEL } from '../../utils/constants'
import { CustomInput } from 'reactstrap'

const AddEditConsumivelForm = ({flag, mConsumivel,setManagedConsumivel, getAllConsumables  }) => {


    const {nome, descricao, quantidade, disponivel, type_consumivel, newConsumivel} = mConsumivel;


    const onChange = e => { 
        const targetName = e.target.name;
        const targetValue = e.target.value;
        mConsumivel.set(targetName, targetValue);
    }

    const onChangeCheckBox = (e, field) => { 
        const targetName = e.target.name;
        mConsumivel.set(field, targetName);
    }

    const onChagneAvailable = (e) =>{ 
        mConsumivel.set('disponivel', !disponivel);
    }

    const clear = () => { 
        setManagedConsumivel(new Consumivel());
    }

    const saveConsumivel = async () => { 
        await mConsumivel.save();
        setManagedConsumivel(new Consumivel());
        getAllConsumables();
    }

    return (
        <div className="dash-table">
            <div className="dash-table-header text-center">
                <h5>Adicionar/Editar</h5>
            </div>
            <div className="dash-content px-4 py-4">
                <form>
                    <div className="mb-3">
                        <label for="consumable_name" className="form-label info-msg"  >Nome do Consumivel: </label>
                        <input type="text" className="form-control" id="consumable_name" name="nome" value={nome} onChange={e => onChange(e)}  />
                    </div>
                    <div className="mb-3">
                        <label for="consumable_description" className="form-label info-msg">Descricao: </label> 
                        <textarea className="form-control" id="consumable_description" rows="3"  name="descricao" value={descricao} onChange={e => onChange(e)}  ></textarea>
                    </div>

                    {(type_consumivel === MATERIAL_CONSUMIVEL) && <div className="mb-3">
                        <label for="consumable_qtd" className="form-label info-msg">Quantidade: </label>
                        <input type="number" className="form-control w-25" id="consumable_qtd" name="quantidade" value={quantidade} onChange={e => onChange(e)} />
                    </div>}

                    {(type_consumivel === SERVICO_CONSUMIVEL) && 
                        <div class="form-check  form-check-inline form-switch mx-0 my-3">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={disponivel} onChange={e => onChagneAvailable(e)} />
                            <label class="form-check-label" for="flexSwitchCheckChecked">{disponivel? "Desactivar":"Activar"}</label>
                        </div>
                    }

                    <div className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" name={MATERIAL_CONSUMIVEL} disabled={!newConsumivel} checked={type_consumivel === MATERIAL_CONSUMIVEL} onChange={e => onChangeCheckBox(e, 'type_consumivel')} />
                            <label className="form-check-label" for="flexRadioDefault5">
                                Material
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" name={SERVICO_CONSUMIVEL} disabled={!newConsumivel} checked={type_consumivel === SERVICO_CONSUMIVEL} onChange={e => onChangeCheckBox(e, 'type_consumivel')} />
                            <label className="form-check-label" for="flexRadioDefault4">
                                Servico
                            </label>
                        </div>
                    </div>

                    
                </form> 
                <div className="admin-form-actions">
                    <button type="button" className="btn btn-primary" onClick={e => saveConsumivel(e)}>{newConsumivel? "Adicionar":"Actualizar"}</button>
                    <button type="button" className="btn btn-light mx-3" onClick={e => clear(e)}>Limpar</button>                                            </div>
            </div>
        </div>
    )
}

AddEditConsumivelForm.propTypes = {
    setManagedConsumivel: PropTypes.func.isRequired,
    mConsumivel: PropTypes.object,
    getAllConsumables: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    mConsumivel: state.admin.mConsumivel,
    flag: state.admin.flag,
})

const mapDispatchToProps = {
    setManagedConsumivel,
    getAllConsumables,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditConsumivelForm)
