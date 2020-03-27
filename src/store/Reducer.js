import { combineReducers } from 'redux'
import {SET_ACCOUNT_INFO, DEL_ACCOUNT_INFO} from './Action'

const accountInitialState = {
  accountInfo: {
  	uid:0,
    accountName: '',
    regTime: '',
    token: '',
  }
};

const accountReducer = function(state=accountInitialState, action) {

  switch (action.type) {

    case SET_ACCOUNT_INFO:
      action.accountInfo = Object.assign({}, state.accountInfo, action.accountInfo)
      return Object.assign({}, state, { accountInfo: action.accountInfo })

    case DEL_ACCOUNT_INFO:
      return { accountInfo: accountInitialState.accountInfo };

    default:
      return state
  }
}

const localDBReducer = function(state=[], action) {
  return state
}

const allReducers = {
  accountReducer: accountReducer,
  localDBReducer: localDBReducer
}

const rootReducer = combineReducers(allReducers)

export default rootReducer