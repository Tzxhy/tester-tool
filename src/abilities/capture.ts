/* eslint-disable class-methods-use-this */

import * as rrweb from 'rrweb';

import Ability from './ability';

export default class CaptureAbility extends Ability {
    get abilityName(): string {
        return 'capture';
    }

    get abilityChineseName(): string {
        return '屏幕录制';
    }

    get dataExt(): string {
        return '.json';
    }

    constructor() {
        super(null, null);
        this.ui = [
            {
                text: '开始录制',
                onClick: this.startRecord.bind(this),
            },
            {
                text: '结束录制',
                onClick: this.stopRecord.bind(this),
            },
        ];
    }

    private started = false;

    private stopFn!: CallableFunction;

    private lastStartTimestamp!: number;

    startRecord() {
        if (this.started) return;
        const self = this;
        this.stopFn = rrweb.record({
            emit(event) {
                self.dataDao.add(event);
            },
        });
        this.started = true;
        this.lastStartTimestamp = Date.now();
    }

    stopRecord() {
        if (this.started) {
            this.started = false;
            this.stopFn();
        }
    }

    private updateLogTimer!: number;

    renderDynamicUi(): HTMLElement | null {
        const u = document.createElement('div');
        u.innerHTML = '<p>本次录制<span class=\'number\'>0</span>秒</p>';
        u.style.transformOrigin = '0 50%';
        this.updateLogTimer = window.setInterval(() => {
            (u.querySelector('.number') as HTMLSpanElement)!.innerText = this.started ? (
                Math.floor((Date.now() - this.lastStartTimestamp) / 1000) + ''
            ) : '0';
            if (this.started) {
                u.style.color = u.style.transform === 'scale(1.3)' ? 'black' : 'red';
                u.style.transform = u.style.transform === 'scale(1.3)' ? 'scale(1)' : 'scale(1.3)';
            } else {
                u.style.transform = 'scale(1)';
                u.style.color = 'black';
            }
        }, 1000);
        return u;
    }

    eject(): void {
        window.clearInterval(this.updateLogTimer);
        super.eject();
    }

}
