/* eslint-disable class-methods-use-this */

import {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';

import Adapter from './adapter';
// import { log } from '..';

export default class NetworkAdapter extends Adapter {

    private axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        super();
        this.axios = axios;
    }

    private responseHandlerId = -1;

    customInject(): boolean {
        // @ts-ignore
        this.axios.interceptors.response.handlers.unshift({
            fulfilled: this.responseSuccess,
            rejected: this.responseFail,
            synchronous: false,
            runWhen: null,
        });
        this.responseHandlerId = 0;
        return true;
    }

    requestSuccess = (v: AxiosRequestConfig) => v;

    responseSuccess = (v: AxiosResponse) => {
        this.dataDao.add({
            type: 'succ',
            data: v,
        });
        return v;
    };

    responseFail = (v: AxiosResponse) => {
        this.dataDao.add({
            type: 'fail',
            data: v,
        });
        return Promise.reject(v);
    };

    getStackTrace(excludeFn?: CallableFunction) {
        const obj = {} as any;
        (Error as any).captureStackTrace(obj, excludeFn);
        return obj.stack;
    }

    restore() {
        this.axios.interceptors.response.eject(this.responseHandlerId);
    }
}
