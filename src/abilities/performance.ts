/* eslint-disable class-methods-use-this */
import {
    cloneDeep,
} from 'lodash'
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

    private gatherMemoryTimer: number;

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
                // 'event',
                'first-input',
                'largest-contentful-paint',
                // 'layout-shift',
                'longtask',
                'mark',
                'measure',
                'navigation',
                'paint',
                'resource',
            ]
        });
        this.gatherMemoryTimer = window.setInterval(() => {
            if ('memory' in performance) {
                const info = {
                    type: 'memory',
                } as Record<string, any>;
                info.memory = {
                    jsHeapSizeLimit: (performance.memory as any)?.jsHeapSizeLimit,
                    totalJSHeapSize: (performance.memory as any)?.totalJSHeapSize,
                    usedJSHeapSize: (performance.memory as any)?.usedJSHeapSize,
                };
                this.dataDao.add(info);
            }
        }, 5000)
    }

    private observer: PerformanceObserver;

    afterLoad(): void {
        const performance = window.performance;

        const info = {
            type: 'after-load',
        } as Record<string, any>

        if ('memory' in performance) {
            info.memory = {
                jsHeapSizeLimit: (performance.memory as any)?.jsHeapSizeLimit,
                totalJSHeapSize: (performance.memory as any)?.totalJSHeapSize,
                usedJSHeapSize: (performance.memory as any)?.usedJSHeapSize,
            };
        }
        info.timeOrigin = performance.timeOrigin;
        const navigationTiming = performance.getEntriesByType('navigation')?.[0];
        if (navigationTiming) {
            info.timing = cloneDeep(navigationTiming.toJSON());
        }

        const paints = performance.getEntriesByType('paint');

        info.paints = cloneDeep(paints);

        this.dataDao.add(info);

    }

    eject() {
        super.eject();
        this.observer.disconnect();
        window.clearInterval(this.updateLogTimer);
        window.clearInterval(this.gatherMemoryTimer);
    }

    private updateLogTimer!: number;

    renderDynamicUi(): HTMLElement | null {
        const u = document.createElement('div');
        u.innerHTML = '<p>当前已收集<span class=\'number\'>0</span>条信息</p>';
        this.updateLogTimer = window.setInterval(() => {
            (u.querySelector('.number') as HTMLSpanElement)!.innerText = this.dataDao.length + '';
        }, 5000);
        return u;
    }
}
