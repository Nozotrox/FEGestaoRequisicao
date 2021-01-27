import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { doesArrayExist } from '../../utils/utils';
import {v4} from 'uuid';
import { ERROR_TOAST, LOADING_TOAST, SUCCESS_TOAST } from '../../utils/constants';
import { ToastBody, ToastHeader, Toast as TT } from 'reactstrap';

const Toast = ({messages}) => {

    let toRender, toastHeader, toastColor, toastIcon;
    if (doesArrayExist(messages)) { 
        
        toRender = messages.map(message => { 
            toastHeader = (message.type === SUCCESS_TOAST)? "Sucesso": (message.type === ERROR_TOAST)? "Erro":"Processando...";
            toastColor = (message.type === SUCCESS_TOAST)? "toast-success": (message.type === ERROR_TOAST)? "toast-error":"toast-loading"
            toastIcon = (message.type === SUCCESS_TOAST)? "check_circle": (message.type === ERROR_TOAST)? "highlight_off":"hourglass_empty"
            return  <TT className="m-4">
                        <ToastHeader>
                            <div className={`d-flex align-items-center ${toastColor}`}>
                                <span class="material-icons">
                                    {toastIcon}
                                </span>
                                <span className="mx-2">{toastHeader}</span>
                            </div>
                        </ToastHeader>
                        {(message.type !== LOADING_TOAST) && <ToastBody>
                            {message.message}
                        </ToastBody>}
                    </TT>
    })
    }
  

    return (
        <Fragment>
           {toRender}
        </Fragment>
    )
}

Toast.propTypes = {
    messages: PropTypes.array,
}

const mapStateToProps = (state) => ({
    messages: state.toast.messages
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
