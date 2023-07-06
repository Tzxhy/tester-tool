/* eslint-disable class-methods-use-this */

// import { log } from '..';
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
        // log('onerror', msg, _url, _line, _col, error)
        this.dataDao.add({
            msg,
            stack: error?.stack || this.getStackTrace(this.handleOnError),
            type: 'onerror',
        });
        return true;
    };

    handleError = (e: ErrorEvent) => {
        // log('error', e)
        if (e.target === window) return;
        this.dataDao.add({
            msg: e.message,
            stack: e.error?.stack || this.getStackTrace(this.handleError),
            type: 'error',
        });
    };

    handleUnhandledRejection = (e: PromiseRejectionEvent) => {
        this.dataDao.add({
            msg: e.reason.message,
            stack: e.reason.stack,
            type: 'unhandledrejection',
        });
    };

    restore() {
        window.onerror = null;
        window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
        window.removeEventListener('error', this.handleError, true);
    }
}
