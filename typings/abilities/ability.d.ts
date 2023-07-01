import Adapter from '../adapters/adapter';
import { DataDao } from '../data';
import Source from '../sources/source';
type UI = {
    text: string;
    onClick: () => void;
};
export default abstract class Ability {
    abstract get abilityName(): string;
    abstract get abilityChineseName(): string;
    abstract get dataExt(): string;
    /** UI部分 */
    ui: UI[];
    /** 适配器 */
    protected adapter: Adapter | null;
    /** 数据发生器 */
    protected source: Source | null;
    protected dataDao: DataDao;
    constructor(adapter: Adapter | null, source: Source | null);
    _injectDataDao(d: DataDao): void;
    renderDynamicUi(): HTMLElement | null;
    getDataDao(): DataDao;
    inject(): void;
    eject(): void;
    /** 格式化数据 */
    formatData(): string;
}
export {};
