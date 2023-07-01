import { DataEmitter } from '../data';
/**
 * 适配器基类。提供对
 *
 * @export
 * @abstract
 * @class Adapter
 */
export default abstract class Adapter extends DataEmitter {
    inject(): void;
    abstract customInject(..._args: any[]): boolean;
    restore(): void;
}
