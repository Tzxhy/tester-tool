/* eslint-disable class-methods-use-this */

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
    get abilityName(): string {
        return 'performance';
    }

    get abilityChineseName(): string {
        return '性能数据';
    }

    get dataExt(): string {
        return '.json';
    }

    constructor() {
        super(null, null);
        this.observer = new PerformanceObserver((list) => {
            for(const entry of list.getEntries()) {
                this.dataDao.add({
                    name: entry.name,
                    type: entry.entryType,
                    startTime: entry.startTime,
                    duration: entry.duration,
                })
            }
        })
        this.observer.observe({
            entryTypes: [
                'element',
                'event',
                'first-input',
                'largest-contentful-paint',
                'layout-shift',
                'longtask',
                'mark',
                'measure',
                'navigation',
                'paint',
                'resource',
            ]
        })
    }

    private observer: PerformanceObserver;

    afterLoad(): void {
        const performance = window.performance;

        const info = {} as Record<string, any>

        if ('memory' in performance) {
            info.memory = {
                ...performance.memory!,
            }
        }
        info.timeOrigin = performance.timeOrigin;
        const navigationTiming = performance.getEntriesByType('navigation')?.[0];
        if (navigationTiming) {
            info.timing = {
                ...navigationTiming,
            }
        }

        this.dataDao.add(info);

    }

    eject() {
        super.eject();
        this.observer.disconnect();
    }

}
