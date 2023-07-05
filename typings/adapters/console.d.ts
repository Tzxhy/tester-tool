import Adapter from './adapter';
export declare enum CONSOLE_LEVEL {
    DEFAULT = "default",
    VERBOSE = "verbose",
    INFO = "info",
    WARNING = "warn",
    ERROR = "error"
}
export default class ConsoleAdapter extends Adapter {
    levels: CONSOLE_LEVEL[];
    private originConsole;
    constructor(levels?: CONSOLE_LEVEL[]);
    customInject(): boolean;
    getStackTrace(excludeFn: CallableFunction): any;
    inject(): void;
    restore(): void;
}
