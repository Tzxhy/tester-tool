import Ability from './abilities/ability';
import CaptureAbility from './abilities/capture';
import ConsoleAbility from './abilities/console';
import NetworkAbility from './abilities/network';
import { ErrorAbility } from '.';
export default class TesterController {
    private abilities;
    private dataPool;
    private archivePool;
    private currentDataDao;
    constructor(abilities: Ability[]);
    onAddData: (d: any) => boolean;
    private testerWrapperId;
    prepareUI(): void;
    static getAllAbilitiesClass(): readonly (typeof CaptureAbility | typeof ConsoleAbility | typeof NetworkAbility | typeof ErrorAbility)[];
    /** 开始 */
    pause(): void;
    /** 停止 */
    stop(): void;
    clear(): void;
    /** 销毁实例 */
    destroy(): void;
    /** 下载所有数据到一个zip包 */
    download(): void;
}
/** 每一项能力对应一个适配器（可没有适配器）和一个源（可没有源） */
