/* eslint-disable class-methods-use-this */

import Adapter from './adapter';

export default class ErrorAdapter extends Adapter {

    customInject(): boolean {
        return false;
    }

    getStackTrace(excludeFn?: CallableFunction) {
        const obj = {} as any;
        (Error as any).captureStackTrace(obj, excludeFn);
        return obj.stack;
    }

    inject() {
        window.onerror = this.handleOnError;
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
        window.addEventListener('error', this.handleError, true);
    }

    handleOnError = (msg: Event | string, _url?: string, _line?: number, _col?: number, error?: Error) => {
        this.dataDao.add({
            msg,
            track: error?.stack || this.getStackTrace(this.handleOnError),
            type: 'onerror',
        });
    };

    handleError = (e: ErrorEvent) => {
        this.dataDao.add({
            msg: e.message,
            track: e.error?.stack || this.getStackTrace(this.handleError),
            type: 'error',
        });
        return false;
    };

    handleUnhandledRejection = (e: PromiseRejectionEvent) => {
        const stack = this.getStackTrace();
        this.dataDao.add({
            msg: e.reason,
            track: stack,
            type: 'unhandledrejection',
        });
    };

    restore() {
        window.onerror = null;
        window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
        window.removeEventListener('error', this.handleError, true);
    }
}
