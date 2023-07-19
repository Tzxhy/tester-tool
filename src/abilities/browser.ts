/* eslint-disable class-methods-use-this */

import Ability from './ability';

/**
 * 用于获取浏览器信息
 *
 * @export
 * @class BrowserAbility
 * @extends {Ability}
 */
export default class BrowserAbility extends Ability {
    get abilityName(): string {
        return 'browser';
    }

    get abilityChineseName(): string {
        return '浏览器信息';
    }

    get dataExt(): string {
        return '.json';
    }

    constructor() {
        super(null, null);
    }

    afterLoad(): void {
        // 注入相关浏览器信息
        const navigator = window.navigator;
        const info = {} as Record<string, any>;
        info.hardwareConcurrency = navigator.hardwareConcurrency;
        info.language = navigator.language;
        info.pdfViewerEnabled = navigator.pdfViewerEnabled;
        info.platform = navigator.platform;
        info.userAgent = navigator.userAgent;

        this.dataDao.add(info);
    }

    private updateLogTimer!: number;

    renderDynamicUi(): HTMLElement | null {
        const u = document.createElement('div');
        u.innerHTML = '<p>当前已收集<span class=\'number\'>0</span>条数据</p>';
        this.updateLogTimer = window.setInterval(() => {
            (u.querySelector('.number') as HTMLSpanElement)!.innerText = this.dataDao.length + '';
        }, 5000);
        return u;
    }

    eject(): void {
        super.eject();
        window.clearInterval(this.updateLogTimer);
    }

}
