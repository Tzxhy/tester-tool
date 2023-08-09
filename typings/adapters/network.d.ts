import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Adapter from './adapter';
export default class NetworkAdapter extends Adapter {
    private axios;
    private isResError;
    private pendingTimeout;
    private pendingCache;
    private apiId;
    constructor(axios: AxiosInstance, isResError: (r: AxiosResponse) => boolean, pendingTimeout?: number);
    private responseHandlerId;
    private requestHandlerId;
    customInject(): boolean;
    requestSuccess: (v: AxiosRequestConfig) => any;
    responseSuccess: (v: AxiosResponse) => any;
    responseFail: (v: AxiosResponse) => Promise<never>;
    getStackTrace(excludeFn?: CallableFunction): any;
    restore(): void;
}
