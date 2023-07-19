/* eslint-disable class-methods-use-this */

import Ability from './ability';

type CheckItem = {
    check: (this: undefined) => boolean;
    tip: (supported: boolean) => string | null;
}

/**
 * 用于进行浏览器能力检测
 *
 * @export
 * @class AbilityCheckAbility
 * @extends {Ability}
 */
export default class AbilityCheckAbility extends Ability {
    get abilityName(): string {
        return 'ability-check';
    }

    get abilityChineseName(): string {
        return '浏览器能力检测';
    }

    get dataExt(): string {
        return '.json';
    }

    private checks: CheckItem[];

    constructor(checks: CheckItem[] = []) {
        super(null, null);
        this.checks = checks;
    }

    addCheck(check: CheckItem) {
        this.checks.push(check);
    }

    afterLoad(): void {
        const tips = [] as string[];
        this.checks.forEach(i => {
            const support = i.check.call(undefined)
            const ret = i.tip(support);
            if (ret && typeof ret === 'string') {
                tips.push(ret);
            }
        })

        this.dataDao.add(tips);
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
