import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Adapter from './adapter';
export default class NetworkAdapter extends Adapter {
    private axios;
    constructor(axios: AxiosInstance);
    private responseHandlerId;
    customInject(): boolean;
    requestSuccess: (v: AxiosRequestConfig) => any;
    responseSuccess: (v: AxiosResponse) => any;
    responseFail: (v: AxiosResponse) => any;
    getStackTrace(excludeFn?: CallableFunction): any;
    restore(): void;
}
