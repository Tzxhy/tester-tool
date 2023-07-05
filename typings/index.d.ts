import { strFromU8, unzipSync } from 'fflate';
export { drag } from './utils';
export * from './abilities';
export * as ConsoleAdapter from './adapters/console';
export * as TesterController from './tester';
export { log, originConsole, } from './utils';
import rrwebPlayer, { type RRwebPlayerOptions } from 'rrweb-player';
export { rrwebPlayer as PlayerType, };
export declare function replay(config?: Partial<RRwebPlayerOptions>): rrwebPlayer;
export { strFromU8, unzipSync, };
