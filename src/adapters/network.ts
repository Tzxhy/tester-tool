/* eslint-disable class-methods-use-this */

import {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';

import Adapter from './adapter';
// import { log } from '..';

enum ResType {
    FAIL = 'fail',
    SUCC = 'succ',
}

export default class NetworkAdapter extends Adapter {

    private axios: AxiosInstance;

    private isResError:  (r: AxiosResponse) => boolean;

    constructor(axios: AxiosInstance, isResError: (r: AxiosResponse) => boolean) {
        super();
        this.axios = axios;
        this.isResError = isResError;
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
        const type = this.isResError(v) ? ResType.FAIL : ResType.SUCC;
        this.dataDao.add({
            type,
            data: v,
        });
        return v;
    };

    responseFail = (v: AxiosResponse) => {
        this.dataDao.add({
            type: ResType.FAIL,
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
