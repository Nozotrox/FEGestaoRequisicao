import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Badge, Button, Form, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { ERROR_TOAST, MATERIAL_CONSUMIVEL } from '../../utils/constants'
import { doesArrayExist, doesObjectExist } from '../../utils/utils'
import { addToastMessage } from '../../actions/toast'

const CheckoutModal = ({user, showModal, closeModal, addToastMessage}) => {

    let listRequisicao 
    if(doesObjectExist(user.requisicao)){ 
        
        listRequisicao = user.requisicao.consumiveis.map(cons => { 
        return <ListGroupItem className="justify-content-between">
            <div className="d-flex justify-content-between">
                <span className="text-truncate w-25">
                    {cons.nome} 
                </span>
                <div className="text-center">
                <span className={`badge ${cons.type_consumivel === MATERIAL_CONSUMIVEL? "bg-primary":"bg-warning"}`}>{cons.type_consumivel}</span>
                </div>
                <div className="w-25 text-right d-flex justify-content-end">
                    {(cons.type_consumivel === MATERIAL_CONSUMIVEL) && <span className="plus-button info-crum-available px-2" onClick={e => user.requisicao.increaseQtd(cons)} >+</span>}
                    <span className="mx-2">{user.requisicao.qtdMap[cons.codigo]}</span>
                    {(cons.type_consumivel === MATERIAL_CONSUMIVEL) && <span className="minus-button info-crum-available px-2" onClick={e => user.requisicao.decreaseQtd(cons)}>-</span>}
                </div>
                
            </div>
        </ListGroupItem>
        })
    }

    const onChange = e => { 
        const targetName = e.target.name;
        const targetValue = e.target.value;

        user.requisicao.set(targetName, targetValue);
    }

    const onSaveRequest = async e => { 
        if (await user.requisicao.save()) { 
            closeModal(true) 
        };
    }

    return (
        <div>
        <Modal isOpen={showModal}  className={"className"}>
          <ModalHeader >Confirmar Requisção</ModalHeader>
          <ModalBody>
              <Form className="my-2">
                  <Label htmlFor="destionReq">Destino: </Label>
                  <Input type="class" name="destino" id="destinoReq" value={user.requisicao.destino} onChange={e => onChange(e)} />
              </Form>
            <ListGroup>
                {listRequisicao}
            </ListGroup>    
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={e => onSaveRequest(e)} >Confirmar</Button>
            <Button color="normal" className="mx-2" onClick={e => closeModal(false)} >Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
}

CheckoutModal.propTypes = {
    user: PropTypes.object,
    addToastMessage: PropTypes.func,
    
}

const mapStateToProps = (state) => ({
    user: state.auth.user,

})

const mapDispatchToProps = {
    addToastMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);
