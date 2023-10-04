const axios = require('axios').default;
import jwt_decode from "jwt-decode";

import { logoutEvent, storeKeys } from '../common';
import {TargetConfig} from '../TargetConfig';
import { getData, setData } from '../Helpers/StorageHelper';
 

class API {
  constructor() {
    axios.defaults.baseURL = TargetConfig.APP_CONFIG_URL;
    // Use this to inject anything with all the request
    axios.interceptors.request.use(
      async(config: any) => {
        const token = await getData(storeKeys.sessionToken)
        const item = { ...config };
        if (token) {
          item.headers.Authorization = `Bearer ${token}`;
          return item;
        }
        return config;
      },
      (error: any) => {
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      (responseInter: any) => responseInter,
      (error: any) => new Promise(async(resolve, reject) => {
        const originalReq = error.config;
        const token = await getData(storeKeys.sessionToken)
        const refreshToken = await getData(storeKeys.refreshToken)
        if (
          refreshToken
            && error?.response?.status === 401
            && !originalReq._retry
        ) {
          const refreshExpireTime: any = this.getRefreshTokenTime()
          if (refreshExpireTime && refreshExpireTime * 1000 < new Date().getTime()) {
             this.logout()
          } else {
            originalReq._retry = true;
           // let url = `${axios.defaults.baseURL}auth/refresh-token`
           let url =`your refresh token url`
            let headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            }
            const res = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({refreshToken: refreshToken})
              })
              .then((response) => {
                if (response.status === 200) {
                  return response.json();
                }
                this.logout()
              })
              .then((response) => {
                if (response) {
                  setData(storeKeys.sessionToken,response?.tokens?.accessToken)
                  setData(storeKeys.refreshToken,response?.tokens?.refreshToken)
                  const token = getData(storeKeys.sessionToken)
                  originalReq.headers.Authorization = `Bearer ${token}`;
                  return axios(originalReq);
                }
              });
            resolve(res);
          }
        }
        reject(error);
      }),
    );

  }

  logout = async() => {
    setData(storeKeys.sessionToken,null)
    setData(storeKeys.refreshToken,null)
    logoutEvent.emit('logout');
}

  getRefreshTokenTime = async() => {
    let refreshToken = await getData(storeKeys.refreshToken)
    if (refreshToken) {
      const decoded: any = jwt_decode(refreshToken);
      decoded?.exp;
    }
    return null;
  };

  async get(url:string) {
    return axios.get(url);
  }

  async getFilter(url:string,data?: any) {
    return axios.get(url,data);
  }

  async post(url: string, data?: any) {
    return axios.post(url, data);
  }

  async postDocs(url: string, data?: any) {
    return axios.post(url, data , {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  async put(url: string, data?: any) {
    return axios.put(url, data);
  }

  async delete(url: string) {
    return axios.delete(url);
  }
}
export default new API();