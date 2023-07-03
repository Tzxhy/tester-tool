import Ability from './ability';
export default class CaptureAbility extends Ability {
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    constructor();
    private started;
    private stopFn;
    private lastStartTimestamp;
    startRecord(): void;
    stopRecord(): void;
    private updateLogTimer;
    renderDynamicUi(): HTMLElement | null;
    visibilitychange: () => void;
    inject(): void;
    eject(): void;
    afterClear(): void;
}
