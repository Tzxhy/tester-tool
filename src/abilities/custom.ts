/* eslint-disable class-methods-use-this */

import Ability from './ability';

/**
 * 用于添加自定义数据
 *
 * @export
 * @class CustomAbility
 * @extends {Ability}
 */
export default class CustomAbility extends Ability {
    get abilityName(): string {
        return 'custom';
    }

    get abilityChineseName(): string {
        return '自定义数据';
    }

    get dataExt(): string {
        return '.json';
    }

    constructor() {
        super(null, null);
    }

    addData(d: any) {
        this.dataDao.add(d);
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
