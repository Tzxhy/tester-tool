import Ability from './ability';
/**
 * 用于添加自定义数据
 *
 * @export
 * @class CustomAbility
 * @extends {Ability}
 */
export default class CustomAbility extends Ability {
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    constructor();
    addData(d: any): void;
    private updateLogTimer;
    renderDynamicUi(): HTMLElement | null;
    eject(): void;
}
