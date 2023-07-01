import { type AxiosInstance } from 'axios';
import Ability from './ability';
export default class NetworkAbility extends Ability {
    constructor(axiosInstance: AxiosInstance);
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    private updateLogTimer;
    renderDynamicUi(): HTMLElement | null;
    eject(): void;
}
