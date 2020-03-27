/**
 * myHttp.js封装所有http请求
 */

import axios from 'axios'
import {env, apiUrls} from '../config/ServerInfo.json'

let defaultConfig = {
    baseUrl: apiUrls[env],
    timeout: 5000
};
let baseUrl = defaultConfig.baseUrl

class MyHttp {

    //POST
    async post(url, data) {
        try {
            console.log(url)
            console.log(data)
            return await axios(url, {
                               method: 'post',
                               baseURL: baseUrl,
                               data: data,
            })
        } catch (e) {
            console.log(e)
            return null
        }
    }

}

export default MyHttp = new MyHttp();