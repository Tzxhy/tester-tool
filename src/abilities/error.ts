/* eslint-disable class-methods-use-this */

import ErrorAdapter from '../adapters/error';
import Ability from './ability';

export default class ErrorAbility extends Ability {
    get abilityName(): string {
        return 'error';
    }

    get abilityChineseName(): string {
        return '错误收集';
    }

    get dataExt(): string {
        return '.json';
    }

    constructor() {
        super(new ErrorAdapter(), null);
    }

    private updateLogTimer!: number;

    renderDynamicUi(): HTMLElement | null {
        const u = document.createElement('div');
        u.innerHTML = '<p>当前已收集<span class=\'number\'>0</span>条错误</p>';
        this.updateLogTimer = window.setInterval(() => {
            (u.querySelector('.number') as HTMLSpanElement)!.innerText = this.dataDao.length + '';
        }, 5000);
        return u;
    }

    eject(): void {
        window.clearInterval(this.updateLogTimer);
        super.eject();
    }

}
