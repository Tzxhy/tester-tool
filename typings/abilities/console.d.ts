import { CONSOLE_LEVEL } from '../adapters/console';
import Ability from './ability';
export default class ConsoleAbility extends Ability {
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    private updateLogTimer;
    constructor(levels?: CONSOLE_LEVEL[]);
    renderDynamicUi(): HTMLElement | null;
    eject(): void;
}
