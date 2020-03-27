/*
 *
 * rmRequest.js封装所有服务器的API供页面调用
 *
 */
import MyHttp from './MyHttp'

export default {
	
	/* ===============================
	        API of Service-account
	   =============================== */

  /**
   * Register
   */
  register: urlPar => MyHttp.post('/account/register', urlPar),
  
  /**
   * Login
   */
  login: urlPar => MyHttp.post('/account/login', urlPar),
  
};