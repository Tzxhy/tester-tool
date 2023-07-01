/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Adapter from '../adapters/adapter';
import {
    DataDao,
} from '../data';
import Source from '../sources/source';

type UI = {
    text: string;
    onClick: () => void;
}
export default abstract class Ability {

    abstract get abilityName(): string;

    abstract get abilityChineseName(): string;

    abstract get dataExt(): string;

    /** UI部分 */
    ui = [] as UI[];

    /** 适配器 */
    protected adapter: Adapter | null;

    /** 数据发生器 */
    protected source: Source | null;

    protected dataDao!: DataDao;

    constructor(adapter: Adapter | null, source: Source | null) {
        this.adapter = adapter;
        this.source = source;
    }

    _injectDataDao(d: DataDao) {
        this.dataDao = d;
        if (this.adapter) {
            this.adapter.dataDao = d;
        }
        if (this.source) {
            this.source.dataDao = d;
        }
    }

    renderDynamicUi(): HTMLElement | null {
        return null;
    }

    getDataDao() {
        return this.dataDao;
    }

    // 注入能力
    inject() {
        const customInject = this.adapter?.customInject();
        if (!customInject) {
            this.adapter?.inject();
        }
    }

    // 弹出能力
    eject() {
        this.adapter?.restore();
    }

    /** 格式化数据 */
    formatData(): string {
        return JSON.stringify(this.getDataDao().get());
    }

    // // 开启
    // abstract enable(): void;

    // // 关闭
    // abstract disable(): void;

}
