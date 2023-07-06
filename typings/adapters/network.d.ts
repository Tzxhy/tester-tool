import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Adapter from './adapter';
export default class NetworkAdapter extends Adapter {
    private axios;
    private isResError;
    constructor(axios: AxiosInstance, isResError: (r: AxiosResponse) => boolean);
    private responseHandlerId;
    customInject(): boolean;
    requestSuccess: (v: AxiosRequestConfig) => any;
    responseSuccess: (v: AxiosResponse) => any;
    responseFail: (v: AxiosResponse) => Promise<never>;
    getStackTrace(excludeFn?: CallableFunction): any;
    restore(): void;
}
