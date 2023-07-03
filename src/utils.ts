import {
    throttle,
} from 'lodash';

const oLog = console.log;
export function log(...args: any[]) {
    oLog(...args);
}

export function drag(ele: HTMLElement) {
    let isMoving = false;
    ele.style.position = 'fixed';
    ele.style.zIndex = '999';
    let diffX = 0;
    let diffY = 0;
    ele.addEventListener('mousedown', (e) => {
        isMoving = true;
        const s = getComputedStyle(ele);
        const x = parseFloat(s.left);
        const y = parseFloat(s.top);
        diffX = x - e.clientX;
        diffY = y - e.clientY;
    });
    window.addEventListener('mouseup', () => {
        isMoving = false;
    });

    const handleMouseMove = throttle((e: MouseEvent) => {
        if (!isMoving) return;
        e.preventDefault();
        ele.style.left = e.clientX + diffX + 'px';
        ele.style.top = e.clientY + diffY + 'px';
        ele.style.bottom = 'unset';
        ele.style.right = 'unset';
    }, 16);
    window.addEventListener('mousemove', handleMouseMove);
}

export function getFilenameTime() {
    const n = new Date();
    return `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}-${n.getHours()}-${n.getMinutes()}-${n.getSeconds()}`;
}