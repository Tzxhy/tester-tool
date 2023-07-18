import Ability from './ability';
/**
 * 用于获取页面性能数据
 *
 * 获取页面加载时性能数据（各种时延），获取页面加载关键指标（FCP，FP）
 *
 * 周期获取页面内存占用；获取资源加载性能；
 *
 * @export
 * @class PerformanceAbility
 * @extends {Ability}
 */
export default class PerformanceAbility extends Ability {
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    constructor();
    private observer;
    afterLoad(): void;
    eject(): void;
}
