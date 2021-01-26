import { combineReducers } from 'redux';
import auth from './auth'
import toast from './toast'
import admin from './admin'

export default combineReducers({ 
    auth,
    toast,
    admin,
});