/* eslint-disable class-methods-use-this */

import ConsoleAdapter, {
    CONSOLE_LEVEL,
} from '../adapters/console';
import Ability from './ability';

export default class ConsoleAbility extends Ability {
    get abilityName(): string {
        return 'console';
    }

    get abilityChineseName(): string {
        return '控制台拦截';
    }

    get dataExt(): string {
        return '.json';
    }

    private updateLogTimer!: number;

    constructor(levels: CONSOLE_LEVEL[] = [CONSOLE_LEVEL.DEFAULT]) {
        super(new ConsoleAdapter(levels), null);
    }

    renderDynamicUi(): HTMLElement | null {
        const u = document.createElement('div');
        u.innerHTML = '<p>当前已收集<span class=\'number\'>0</span>条数据</p>';
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
