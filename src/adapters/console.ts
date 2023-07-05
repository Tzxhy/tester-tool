/* eslint-disable class-methods-use-this */
// import {
//     log,
// } from '../utils';
import Adapter from './adapter';

export enum CONSOLE_LEVEL {
    DEFAULT = 'default',
    VERBOSE = 'verbose',
    INFO = 'info',
    WARNING = 'warn',
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

const METHOD_TO_LEVEL: Record<CONSOLE_METHOD, CONSOLE_LEVEL> = {} as any;
ERROR.forEach(i => {
    METHOD_TO_LEVEL[i] = CONSOLE_LEVEL.ERROR;
});
WARNING.forEach(i => {
    METHOD_TO_LEVEL[i] = CONSOLE_LEVEL.WARNING;
});
INFO.forEach(i => {
    METHOD_TO_LEVEL[i] = CONSOLE_LEVEL.INFO;
});
VERBOSE.forEach(i => {
    METHOD_TO_LEVEL[i] = CONSOLE_LEVEL.VERBOSE;
});

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
                    level: METHOD_TO_LEVEL[key],
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
