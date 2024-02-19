import * as pc from 'playcanvas';
import AssetsHelper from '../../libs/assets-helper.js';

export default class Icon extends pc.Entity {
    constructor(iconName) {
        super();

        this._iconName = iconName;
        this._init();
    }

    _init() {
        const iconAsset = AssetsHelper.getAssetByName(this._iconName, 'texture');

        this.addComponent('element', {
          type: pc.ELEMENTTYPE_IMAGE,
          anchor: [0.5, 0.5, 0.5, 0.5],
          pivot: [0.5, 0.5],
          width: 60,
          height: 60,
          textureAsset: iconAsset,
        });
    }
}
