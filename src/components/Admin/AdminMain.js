import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '../Shared/AppBar'
import DashboardBoxes from './DashboardBoxes'
import DashboardTables from './DashboardTables'

const AdminMain = (props) => {
    return (
        <div className="main-content  d-flex flex-column">
            <AppBar/>
            <div className="content">
                <DashboardBoxes/>
                <DashboardTables/>
            </div>
        </div>
    )
}

AdminMain.propTypes = {

}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain)
