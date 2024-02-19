import * as pc from 'playcanvas';
import Icon from './icon.js';
import AssetsHelper from '../../libs/assets-helper.js';

export default class IconButton extends pc.Entity {
  constructor(icon = null) {
    super();

    this._icon = icon;

    this._init();
  }

  _init() {
    this.addComponent("button");

    this._initBg();
    this._initIcon();
  }

  _initBg() {
    const bgAsset = AssetsHelper.getAssetByName('bg.png', 'texture');

    this.addComponent('element', {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: 100,
      height: 100,
      textureAsset: bgAsset,
    });
  }

  _initIcon() {

    const icon = new Icon(this._icon);
    this.addChild(icon);
  }

}