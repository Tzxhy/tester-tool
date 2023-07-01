import Ability from './ability';
export default class ErrorAbility extends Ability {
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    constructor();
    private updateLogTimer;
    renderDynamicUi(): HTMLElement | null;
    eject(): void;
}
