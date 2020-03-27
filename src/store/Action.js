export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const DEL_ACCOUNT_INFO = 'DEL_ACCOUNT_INFO';

export function setAccountInfo(accountInfo) {
  return {
    type: SET_ACCOUNT_INFO,
    accountInfo: accountInfo
  }
}

export function delAccountInfo() {
  return {
    type: DEL_ACCOUNT_INFO,
  }
}