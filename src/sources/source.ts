import {
    DataEmitter,
} from '../data';

/** 数据发生器。用于自身产生数据，供上层消费。 */
export default abstract class Source<T = any> extends DataEmitter {
    abstract getData(): T;

    abstract onLoad(): void;

    abstract onData(): void;
}
