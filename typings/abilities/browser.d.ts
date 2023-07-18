import Ability from './ability';
/**
 * 用于获取浏览器信息
 *
 * @export
 * @class BrowserAbility
 * @extends {Ability}
 */
export default class BrowserAbility extends Ability {
    get abilityName(): string;
    get abilityChineseName(): string;
    get dataExt(): string;
    constructor();
    afterLoad(): void;
}
