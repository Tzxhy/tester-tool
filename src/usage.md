```ts
import fetch from '@utils/fetch';
import {
    type TesterController,
    OPEN_TESTER_KEY,
} from 'tool-tester';

/* eslint-disable new-cap */
async function getTesterModule() {
    return import('tool-tester');
}

let tc: TesterController.default;

/** 打开测试工具 */
export async function openTester() {
    console.log('加载工具模块');

    const module = await getTesterModule();
    // 控制台能力
    const consoleAb = new module.ConsoleAbility.default(
        [
            module.ConsoleAdapter.CONSOLE_LEVEL.WARNING,
            module.ConsoleAdapter.CONSOLE_LEVEL.ERROR,
        ],
    );
    // 录屏能力
    const captureAb = new module.CaptureAbility.default();
    // 监控错误能力
    const errorAb = new module.ErrorAbility.default();
    // 监听网络请求
    const networkAb = new module.NetworkAbility.default(fetch);
    tc = new module.TesterController.default([
        consoleAb,
        captureAb,
        errorAb,
        networkAb,
    ]);
}

/** 打开测试工具 */
export async function closeTester() {
    console.log('关闭工具模块');

    tc.destroy();
}
function toggleOpenTester() {
    const o = localStorage.getItem(OPEN_TESTER_KEY) === 'true';
    localStorage.setItem(OPEN_TESTER_KEY, JSON.stringify(!o));
    if (!o) {
        openTester();
    } else {
        closeTester();
    }
    alert(`${o ? '关闭' : '打开'}测试工具集`);
}

/** 开启测试入口 */

const OPEN_TESTER_STR = 'debugger';
let nowMatchIdx = -1;
function handleKeyPress(e: KeyboardEvent) {
    const k = e.key;
    if (nowMatchIdx === -1) {
        if (k !== OPEN_TESTER_STR[0]) {
            return;
        }
        nowMatchIdx = 0;
        return;
    }
    // 继续匹配或者返回-1
    if (k === OPEN_TESTER_STR[nowMatchIdx + 1]) { // 匹配上下一个
        if (nowMatchIdx + 1 === OPEN_TESTER_STR.length - 1) { // 最后一个匹配上
            toggleOpenTester();
            nowMatchIdx = -1;
            return;
        }
        // 非最后一个匹配上
        ++nowMatchIdx;
        return;
    }
    nowMatchIdx = -1;
}
export async function initTestEntry() {
    const o = localStorage.getItem(OPEN_TESTER_KEY) === 'true';
    window.addEventListener('keypress', handleKeyPress);
    if (o) {
        openTester();
    }
}

```