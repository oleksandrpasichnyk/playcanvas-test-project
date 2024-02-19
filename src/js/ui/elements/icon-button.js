import * as pc from 'playcanvas';
import Icon from './icon.js';
import AssetsHelper from '../../libs/assets-helper.js';

export default class IconButton extends pc.Entity {
  constructor(icon = null) {
    super();

    this._icon = icon;
    this.useInput = true;

    this._init();
  }

  _init() {
    this.addComponent("button", {
      active: true,
      transitionMode: pc.BUTTON_TRANSITION_MODE_SPRITE_CHANGE
    });

    this._initBg();
    this._initIcon();

    this.button.useInput = true;
    this.button.on('click', this._onClick, this);

    // const scale = this.getLocalScale();

    // this.button.on(pc.EVENT_MOUSEDOWN, () => {
    //   this.setLocalScale(scale.clone().mulScalar(1.1));
    // });
    // this.button.on(pc.EVENT_MOUSEUP, () => {
    //   this.setLocalScale(scale);
    // });
  }

  _onClick() {
    console.log('click1')
    this.fire('click1', this);
  }

  _initBg() {
    const bgAsset = AssetsHelper.getAssetByName('bg', 'texture');

    this.addComponent('element', {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: 100,
      height: 100,
      textureAsset: bgAsset,
      useInput: true,
    });
  }

  _initIcon() {
    const icon = new Icon(this._icon);
    this.addChild(icon);
  }

}