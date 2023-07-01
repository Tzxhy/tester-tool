/* eslint-disable class-methods-use-this */

import {
    DataEmitter,
} from '../data';

/**
 * 适配器基类。提供对
 *
 * @export
 * @abstract
 * @class Adapter
 */
export default abstract class Adapter extends DataEmitter {
    // 注入
    inject() {
        //
    }

    // 自定义注入
    abstract customInject(..._args: any[]): boolean;

    // 恢复
    restore() {
        //
    }
}
