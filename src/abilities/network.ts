/* eslint-disable class-methods-use-this */

import {
    AxiosResponse,
    type AxiosInstance,
} from 'axios';

import NetworkAdapter from '../adapters/network';
import Ability from './ability';

export default class NetworkAbility extends Ability {

    constructor(axiosInstance: AxiosInstance, opts?: {
        isResError: (r: AxiosResponse) => boolean;
        pendingTimeout?: number;
    }) {
        const isResError = opts?.isResError ?? (() => false);
        const pendingTimeout = opts?.pendingTimeout ?? Infinity;
        super(new NetworkAdapter(axiosInstance, isResError, pendingTimeout), null);

    }

    get abilityName(): string {
        return 'network';
    }

    get abilityChineseName(): string {
        return '网络请求';
    }

    get dataExt(): string {
        return '.json';
    }

    private updateLogTimer!: number;

    renderDynamicUi(): HTMLElement | null {
        const u = document.createElement('div');
        u.innerHTML = '<p>当前已收集<span class=\'number\'>0</span>条请求</p>';
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
