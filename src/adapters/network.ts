/* eslint-disable class-methods-use-this */

import {
    type AxiosInstance,
    type AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

import Adapter from './adapter';

export default class NetworkAdapter extends Adapter {

    private axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        super();
        this.axios = axios;
    }

    private requestHandlerId = -1;

    private responseHandlerId = -1;

    customInject(): boolean {
        // this.requestHandlerId = this.axios.interceptors.request.use(this.requestSuccess);
        // this.responseHandlerId = this.axios.interceptors.response.use(this.responseSuccess);
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
            t: 'succ',
            data: v,
        });
        return v;
    };

    responseFail = (v: AxiosResponse) => {
        this.dataDao.add({
            t: 'fail',
            data: v,
        });
        return v;
    };

    getStackTrace(excludeFn?: CallableFunction) {
        const obj = {} as any;
        (Error as any).captureStackTrace(obj, excludeFn);
        return obj.stack;
    }

    restore() {
        this.axios.interceptors.request.eject(this.requestHandlerId);
        this.axios.interceptors.response.eject(this.responseHandlerId);
    }
}
