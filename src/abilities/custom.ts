/* eslint-disable class-methods-use-this */

import Ability from './ability';

/**
 * 用于添加自定义数据
 *
 * @export
 * @class CustomAbility
 * @extends {Ability}
 */
export default class CustomAbility extends Ability {
    get abilityName(): string {
        return 'custom';
    }

    get abilityChineseName(): string {
        return '自定义数据';
    }

    get dataExt(): string {
        return '.json';
    }

    constructor() {
        super(null, null);
    }

    addData(d: any) {
        this.dataDao.add(d);
    }

}
