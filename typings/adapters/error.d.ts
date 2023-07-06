import Adapter from './adapter';
export default class ErrorAdapter extends Adapter {
    customInject(): boolean;
    getStackTrace(excludeFn?: CallableFunction): any;
    inject(): void;
    handleOnError: (msg: Event | string, _url?: string, _line?: number, _col?: number, error?: Error) => boolean;
    handleError: (e: ErrorEvent) => void;
    handleUnhandledRejection: (e: PromiseRejectionEvent) => void;
    restore(): void;
}
