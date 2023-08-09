/* eslint-disable class-methods-use-this */

import {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';

import Adapter from './adapter';

enum ResType {
    FAIL = 'fail',
    SUCC = 'succ',
    PENDING_TIMEOUT = 'pending_timeout'
}

const IdKey = Symbol('axios-request')

// enum ApiStatus {
//     Start,
//     Pending,
//     End,
// }

export default class NetworkAdapter extends Adapter {

    private axios: AxiosInstance;

    private isResError:  (r: AxiosResponse) => boolean;

    private pendingTimeout: number;

    private pendingCache = {} as Record<number, number>;

    private apiId = 0;

    constructor(axios: AxiosInstance, isResError: (r: AxiosResponse) => boolean, pendingTimeout = Infinity) {
        super();
        this.axios = axios;
        this.isResError = isResError;
        debugger;
        this.pendingTimeout = pendingTimeout;
    }

    private responseHandlerId = -1;
    private requestHandlerId = -1;

    customInject(): boolean {
        // @ts-ignore
        this.axios.interceptors.request.handlers.unshift({
            fulfilled: this.requestSuccess,
            synchronous: false,
            runWhen: null,
        });
        this.axios.interceptors.response.handlers.unshift({
            fulfilled: this.responseSuccess,
            rejected: this.responseFail,
            synchronous: false,
            runWhen: null,
        });
        this.responseHandlerId = 0;
        this.requestHandlerId = 0;
        return true;
    }

    requestSuccess = (v: AxiosRequestConfig) => {
        v[IdKey] = ++this.apiId;
        if (this.pendingTimeout !== Infinity) {
            this.pendingCache[v[IdKey]] = setTimeout(() => {
                const type = ResType.PENDING_TIMEOUT;
                this.dataDao.add({
                    type,
                    data: v,
                });
                debugger;
                
            }, this.pendingTimeout)
        }
        return v;
    };

    responseSuccess = (v: AxiosResponse) => {
        const type = this.isResError(v) ? ResType.FAIL : ResType.SUCC;
        this.dataDao.add({
            type,
            data: v,
        });
        const apiId = v.config?.[IdKey];
        if (apiId) {
            window.clearTimeout(this.pendingCache[apiId])
            delete this.pendingCache[apiId];
        }
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
        this.axios.interceptors.request.eject(this.requestHandlerId);
    }
}
