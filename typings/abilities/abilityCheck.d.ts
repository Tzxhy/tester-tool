import Ability from './ability';
type CheckItem = {
    check: (this: undefined) => boolean;
    tip: (supported: boolean) => string | null;
};
/**
 * 用于进行浏览器能力检测
 *
 * @export
 * @class AbilityCheckAbility
 * @extends {Ability}
 */
export default class AbilityCheckAbility extends Ability {
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    private checks;
    constructor(checks?: CheckItem[]);
    addCheck(check: CheckItem): void;
    afterLoad(): void;
    private updateLogTimer;
    renderDynamicUi(): HTMLElement | null;
    eject(): void;
}
export {};
