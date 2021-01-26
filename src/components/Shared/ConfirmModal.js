import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ConfirmModal = ({confirmAction, denyAction, displayModal}) => {
    return (
        <div>
        <Modal isOpen={displayModal}  className={"className"}>
          <ModalHeader >Confirmar Acção</ModalHeader>
          <ModalBody>
            Tem a certeza que quer terminar a acção?
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={e => confirmAction(e)}>Confirmar</Button>
            <Button color="normal" className="mx-2" onClick={e => denyAction(e)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
}

export default ConfirmModal;