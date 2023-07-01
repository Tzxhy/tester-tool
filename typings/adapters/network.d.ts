import { type AxiosInstance, type AxiosRequestConfig, AxiosResponse } from 'axios';
import Adapter from './adapter';
export default class NetworkAdapter extends Adapter {
    private axios;
    constructor(axios: AxiosInstance);
    private requestHandlerId;
    private responseHandlerId;
    customInject(): boolean;
    requestSuccess: (v: AxiosRequestConfig) => AxiosRequestConfig<any>;
    responseSuccess: (v: AxiosResponse) => AxiosResponse<any, any>;
    responseFail: (v: AxiosResponse) => AxiosResponse<any, any>;
    getStackTrace(excludeFn?: CallableFunction): any;
    restore(): void;
}
