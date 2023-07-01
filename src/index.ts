import {
    strFromU8,
    unzipSync,
} from 'fflate';
import * as rrweb from 'rrweb';
import { playerConfig } from 'rrweb/typings/types';

export * from './abilities';
export * as ConsoleAdapter from './adapters/console';
export * as TesterController from './tester';

export {
    log
} from './utils';

const OPEN_TESTER_KEY = '__user_open_tester__';

export {
    OPEN_TESTER_KEY,
    strFromU8,
    unzipSync,
};

let events = [] as rrweb.EventType[];

export function record() {
    const stopFn = rrweb.record({
        emit(event) {
            console.log('event: ', event);
            // 将 event 存入 events 数组中
            events.push(event);
        },
    });

    return stopFn;
}

export function replay(events: rrweb.EventType[], config?: Partial<playerConfig>) {
    if (!document.querySelector('[data-type=\'rrweb\']')) {
        const s = document.createElement('style');
        s.innerText = `.replayer-wrapper{position:relative}.replayer-mouse{position:absolute;width:20px;height:20px;transition:left .05s linear,top .05s linear;background-size:contain;background-position:50%;background-repeat:no-repeat;background-image:url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjMwMCIgd2lkdGg9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTQ4LjcxIDQyLjkxTDM0LjA4IDI4LjI5IDQ0LjMzIDE4YTEgMSAwIDAwLS4zMy0xLjYxTDIuMzUgMS4wNmExIDEgMCAwMC0xLjI5IDEuMjlMMTYuMzkgNDRhMSAxIDAgMDAxLjY1LjM2bDEwLjI1LTEwLjI4IDE0LjYyIDE0LjYzYTEgMSAwIDAwMS40MSAwbDQuMzgtNC4zOGExIDEgMCAwMC4wMS0xLjQyem0tNS4wOSAzLjY3TDI5IDMyYTEgMSAwIDAwLTEuNDEgMGwtOS44NSA5Ljg1TDMuNjkgMy42OWwzOC4xMiAxNEwzMiAyNy41OEExIDEgMCAwMDMyIDI5bDE0LjU5IDE0LjYyeiIvPjwvc3ZnPg==");border-color:transparent}.replayer-mouse:after{content:"";display:inline-block;width:20px;height:20px;background:#4950f6;border-radius:100%;transform:translate(-50%,-50%);opacity:.3}.replayer-mouse.active:after{animation:click .2s ease-in-out 1}.replayer-mouse.touch-device{background-image:none;width:70px;height:70px;border-radius:100%;margin-left:-37px;margin-top:-37px;border:4px solid rgba(73,80,246,0);transition:left 0s linear,top 0s linear,border-color .2s ease-in-out}.replayer-mouse.touch-device.touch-active{border-color:#4950f6;transition:left .25s linear,top .25s linear,border-color .2s ease-in-out}.replayer-mouse.touch-device:after{opacity:0}.replayer-mouse.touch-device.active:after{animation:touch-click .2s ease-in-out 1}.replayer-mouse-tail{position:absolute;pointer-events:none}@keyframes click{0%{opacity:.3;width:20px;height:20px}50%{opacity:.5;width:10px;height:10px}}@keyframes touch-click{0%{opacity:0;width:20px;height:20px}50%{opacity:.5;width:10px;height:10px}}
        /*# sourceMappingURL=rrweb.min.css.map */`;
        s.setAttribute('data-type', 'rrweb');
        document.head.appendChild(s);
    }

    const replayer = new rrweb.Replayer(events, config);
    replayer.play();
    // window.replayer = replayer;
    return replayer;
}

export function getDefaultUI() {
    const b1 = document.createElement('button');
    b1.innerText = '录制屏幕';
    let stopFn: any;
    function startRecord() {
        stopFn = record();
    }
    b1.addEventListener('click', startRecord);

    const b2 = document.createElement('button');
    b2.innerText = '结束';
    function stop() {
        stopFn();
        localStorage.setItem('__rrweb__', JSON.stringify(events));
        events = [];
    }
    b2.addEventListener('click', stop);

    const d = document.createElement('div');
    d.appendChild(b1);
    d.appendChild(b2);
    d.style.position = 'fixed';
    d.style.right = '0';
    d.style.bottom = '0';

    return d;
}

export function getPlayUI() {

    const d = document.createElement('div');
    d.innerHTML = `<div>
        <input type='file' placeholder='选择文件' />
    </div>`;

    return d;
}
