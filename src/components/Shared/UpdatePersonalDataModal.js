import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import AddEditUserForm from '../Crud/AddEditUserForm'
import { setManagedUser } from '../../actions/auth'
import Usuario from '../../model/Usuario'
import { getFromLocalStorage } from '../../utils/utils'
import { USER_LOCALSTORAGE } from '../../utils/constants'

const UpdatePersonalDataModal = ({user, mUser, onCloseModal, showModal}) => {


    const updateUser = e => { 
        mUser.save();
        onCloseModal();
    }


    return (
            <Modal isOpen={showModal} backdrop={true} keyboard={true}>
                <ModalHeader>Actualizar Dados</ModalHeader>
                <ModalBody>
                    <AddEditUserForm hideTitle={true} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={e => updateUser()} >Actualizar</Button>{' '}
                    <Button color="secondary" onClick={e => onCloseModal(e)} >Fechar</Button>
                </ModalFooter>
            </Modal>
    )
}

UpdatePersonalDataModal.propTypes = {
    user: PropTypes.object,
    setManagedUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    mUser: state.auth.mUser,
})

const mapDispatchToProps = {
    setManagedUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalDataModal)
