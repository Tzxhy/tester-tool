/// <reference types="vite/client" />
declare module '*.vue' {
    import type {
        DefineComponent,
    } from 'vue';

    const component: DefineComponent<any, any, any>;
    export default component;
}
declare module "axios" {
    type AxiosInstance = any;
    type AxiosRequestConfig = any;
    type AxiosResponse = any;
}