/* eslint-disable class-methods-use-this */
// import {
//     log,
// } from '../utils';
import Adapter from './adapter';

export enum CONSOLE_LEVEL {
    DEFAULT = 'default',
    VERBOSE = 'verbose',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}
type CONSOLE_METHOD = keyof typeof console;

const ERROR: CONSOLE_METHOD[] = [
    'assert',
    'error',
];
const WARNING: CONSOLE_METHOD[] = [
    'warn',
];
const INFO: CONSOLE_METHOD[] = [
    'count',
    'dir',
    'dirxml',
    'info',
    'log',
    'timeEnd',
    'trace',
    'table',
];
const VERBOSE: CONSOLE_METHOD[] = [
    'debug',
];

const DEFAULT: CONSOLE_METHOD[] = [
    ...VERBOSE,
    ...INFO,
    ...WARNING,
    ...ERROR,
];

const LEVEL_MAP: Record<CONSOLE_LEVEL, CONSOLE_METHOD[]> = {
    [CONSOLE_LEVEL.DEFAULT]: DEFAULT,
    [CONSOLE_LEVEL.VERBOSE]: VERBOSE,
    [CONSOLE_LEVEL.INFO]: INFO,
    [CONSOLE_LEVEL.WARNING]: WARNING,
    [CONSOLE_LEVEL.ERROR]: ERROR,
};

export default class ConsoleAdapter extends Adapter {
    private originConsole: Record<string, CallableFunction> = {};

    // private t: number;

    constructor(public levels: CONSOLE_LEVEL[] = [CONSOLE_LEVEL.DEFAULT]) {
        super();
    }

    customInject(): boolean {
        return false;
    }

    getStackTrace(excludeFn: CallableFunction) {
        const obj = {} as any;
        (Error as any).captureStackTrace(obj, excludeFn);
        return obj.stack;
    }

    inject() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        // eslint-disable-next-line max-len
        const allMethods = this.levels.reduce((totalMethod, level) => [...new Set([...totalMethod, ...LEVEL_MAP[level]])], [] as CONSOLE_METHOD[]);
        allMethods.forEach(key => {
            const originMethod = (console as any)[key] as CallableFunction;
            if (typeof originMethod !== 'function') return;
            this.originConsole[key] = originMethod;
            const newFn = function newFn(...args: any[]) {
                const track = self.getStackTrace(newFn);
                self.emit({
                    args,
                    track,
                });
                // @ts-ignore
                originMethod.apply(console, args);
            };
            (console as any)[key] = newFn;
        });
    }

    restore() {
        Object.keys(this.originConsole).forEach(k => {
            (console as any)[k] = this.originConsole[k].bind(console);
        });
        // clearInterval(this.t);
    }
}
