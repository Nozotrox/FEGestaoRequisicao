import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { doesArrayExist } from '../../utils/utils';
import {v4} from 'uuid';
import { SUCCESS_TOAST } from '../../utils/constants';

const Toast = ({messages}) => {

    let toRender;
    if (doesArrayExist(messages)) { 
        toRender = messages.map(message => { 
            return <div key={v4()} className={`tosta-box d-flex justify-content-left `}>
                <span className={`material-icons custom-icon ${message.type === SUCCESS_TOAST? 'icon-success': 'icon-error'}`}>
                    info
                </span>
                <span className="tosta-message pt-1 px-3">{message.message}</span>
            </div>
    })
    }
  

    return (
        <div className="tosta">
            {toRender}
        </div>
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
