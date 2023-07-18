/* eslint-disable no-underscore-dangle */
/* eslint-disable no-sequences */
/* eslint-disable class-methods-use-this */
import {
    strToU8,
    zip,
} from 'fflate';
import {
    saveAs,
} from 'file-saver';

import {
    OPEN_TESTER_KEY,
} from './constants';
import Ability from './abilities/ability';
import CaptureAbility from './abilities/capture';
import ConsoleAbility from './abilities/console';
import NetworkAbility from './abilities/network';
import {
    DataDao,
    DataPool,
} from './data';
import {
    drag, getFilenameTime,
} from './utils';
import { MessagePlugin } from 'tdesign-vue-next';
import { ErrorAbility } from '.';

const ALL_ABILITIES_CLS = Object.freeze([
    ConsoleAbility,
    NetworkAbility,
    CaptureAbility,
    ErrorAbility,
]);

export default class TesterController {
    private abilities: Ability[];

    private dataPool: DataPool;

    private archivePool: DataPool;

    private currentDataDao: DataDao = new DataDao('');

    constructor(abilities: Ability[]) {
        this.abilities = abilities;
        this.dataPool = new DataPool();
        this.archivePool = new DataPool();
        this.currentDataDao = new DataDao('archive');
        this.archivePool.add(this.currentDataDao);
        this.abilities.forEach(i => {
            const d = new DataDao(i.abilityName, {
                onAdd: this.onAddData,
            });
            i._injectDataDao(d);
            this.dataPool.add(d);
            d.setParent(this.dataPool);
            i.inject();
            i.afterLoad();
        });
        // this.archiveDataDaoTimer = window.setInterval(this.archiveDataDao, 1000 * 60); // 每60秒来一次
        this.prepareUI();
    }

    onAddData = (d: any) => {
        this.currentDataDao.add(d);
        return true;
    };

    // archiveDataDao = () => {
    //     // this.abilities.forEach(i => {
    //     //     i.getDataDao().archive();
    //     // });
    //     this.currentDataDao = new DataDao('archive');
    //     this.archivePool.add(this.currentDataDao);
    // };

    private testerWrapperId = '';

    prepareUI() {
        const wrapper = document.createElement('div');
        // eslint-disable-next-line
        wrapper.style.cssText = 'position: fixed;right: 20px;bottom: 200px; padding: 16px; background-color: pink; border-radius: 4px;min-width: 200px; min-height: 40px;color: black;line-height: 1.6;cursor: move;';
        this.testerWrapperId = Math.random().toString().slice(2);
        wrapper.setAttribute('data-tester-id', this.testerWrapperId);
        wrapper.classList.add('rr-block', 'rr-ignore');

        const s = document.createElement('style');
        s.innerHTML = `
            .divider {
                margin-bottom: 8px;
                width: 100%;
                height: 0;
                border-bottom: 1px solid #eee;
            }
        `;

        wrapper.appendChild(s);

        this.abilities.forEach(i => {
            const buttons = i.ui.map(j => {
                const b = document.createElement('button');
                b.innerText = j.text;
                b.addEventListener('click', j.onClick);
                return b;
            });
            const name = i.abilityChineseName;
            const p = document.createElement('p');
            p.innerText = name;
            wrapper.appendChild(p);
            if (buttons.length) {
                buttons.forEach(i => wrapper.appendChild(i));
            }
            const dynamicUi = i.renderDynamicUi();
            if (dynamicUi) {
                wrapper.appendChild(dynamicUi);
            }

            const divider = document.createElement('div');
            divider.classList.add('divider');
            wrapper.appendChild(divider);

        });

        drag(wrapper);

        const d = document.createElement('button');
        const p = document.createElement('p');
        p.innerText = '系统功能';
        wrapper.appendChild(p);
        d.innerText = '下载数据';
        d.addEventListener('click', this.download.bind(this));
        const stop = document.createElement('button');
        stop.innerText = '关闭(双击)';
        stop.addEventListener('dblclick', this.stop.bind(this));
        const reset = document.createElement('button');
        reset.innerText = '重置(双击)';
        reset.addEventListener('dblclick', this.clear.bind(this));
        const ul = document.createElement('ul')
        const lis = [d, stop, reset].map(i => {
            const li = document.createElement('li')
            li.appendChild(i);
            return li;
        });
        lis.forEach(i => {
            ul.appendChild(i);
        })
        wrapper.appendChild(ul);

        document.body.appendChild(wrapper);
    }

    static getAllAbilitiesClass() {
        return ALL_ABILITIES_CLS;
    }

    /** 开始 */
    // start() {
    //     this.abilities.forEach(i => i.enable());
    //     this.running = true;
    // }

    // 暂停收集
    pause() {
        //
    }

    /** 停止 */
    stop() {
        this.destroy();
        localStorage.setItem(OPEN_TESTER_KEY, 'false');
        window.location.reload();
    }

    clear() {
        this.abilities.forEach(i => {
            i.getDataDao().clear();
            i.afterClear();
        });
    }

    /** 销毁实例 */
    destroy() {
        // window.clearInterval(this.archiveDataDaoTimer);
        this.abilities.forEach(i => (i.eject()));
        document.querySelector(`[data-tester-id='${this.testerWrapperId}']`)?.remove();
    }

    /** 下载所有数据到一个zip包 */
    download() {
        // const allData = this.abilities.map(i => ({
        //     type: i.abilityName,
        //     data: i.getDataDao().get(),
        //     ext: i.dataExt,
        // }));
        // const data = {} as any;
        // allData.forEach(item => {
        //     data[item.type + (item.ext || '')] = strToU8(JSON.stringify(item.data));
        // });
        const archive = {} as any;
        // .forEach((dao, idx) => {
        archive['archive' + '.json'] = strToU8(JSON.stringify(this.currentDataDao.get()));
        // });
        zip({
            'tester-data': {
                // slice: data,
                archive,
            },
        }, (err, save) => {
            if (err) {
                MessagePlugin.error(JSON.stringify(err));
                return;
            }
            saveAs(new Blob([save]), `tester-data-${getFilenameTime()}.zip`);

        });
    }
}

/** 每一项能力对应一个适配器（可没有适配器）和一个源（可没有源） */
