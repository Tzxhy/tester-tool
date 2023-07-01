import Ability from './abilities/ability';
import CaptureAbility from './abilities/capture';
import ConsoleAbility from './abilities/console';
import NetworkAbility from './abilities/network';
export default class TesterController {
    private abilities;
    private dataPool;
    private archivePool;
    private archiveDataDaoTimer;
    private currentDataDao;
    constructor(abilities: Ability[]);
    onAddData: (d: any) => boolean;
    archiveDataDao: () => void;
    private testerWrapperId;
    prepareUI(): void;
    static getAllAbilitiesClass(): readonly (typeof CaptureAbility | typeof ConsoleAbility | typeof NetworkAbility)[];
    /** 开始 */
    pause(): void;
    /** 停止 */
    stop(): void;
    /** 销毁实例 */
    destroy(): void;
    /** 下载所有数据到一个zip包 */
    download(): void;
}
/** 每一项能力对应一个适配器（可没有适配器）和一个源（可没有源） */
