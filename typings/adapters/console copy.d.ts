import Adapter from './adapter';
export declare enum CONSOLE_LEVEL {
    DEFAULT = "default",
    VERBOSE = "verbose",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error"
}
export default class ConsoleAdapter extends Adapter {
    levels: CONSOLE_LEVEL[];
    private originConsole;
    private t;
    constructor(levels?: CONSOLE_LEVEL[]);
    customInject(axiosInstance: any): void;
    getStackTrace(excludeFn: CallableFunction): any;
    inject(): void;
    restore(): void;
}
