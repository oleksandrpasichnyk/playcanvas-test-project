import * as pc from 'playcanvas';
import Icon from './icon.js';
import AssetsHelper from '../../libs/assets-helper.js';
import * as TWEEN from '@tweenjs/tween.js'

export default class IconButton extends pc.Entity {
  constructor(icon = null) {
    super();

    this._icon = icon;
    this.useInput = true;

    this._isTween = false;

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
  }

  _onClick() {
    if (this._isTween) return;

    this.fire('click', this);

    this._animate();
  }

  _animate() {
    if (this._isTween) return;

    this._isTween = true;

    const entity = this; // Reference to the entity for use in callbacks
    const startScale = this.getLocalScale().x;
    const targetScale = startScale * 1.1;

    const scaleInTween = new TWEEN.Tween({ scale: startScale })
      .to({ scale: targetScale }, 150)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(function (data) {
        entity.setLocalScale(data.scale, data.scale, 1);
      });

    const scaleOutTween = new TWEEN.Tween({ scale: targetScale })
      .to({ scale: startScale }, 100)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(function (data) {
        entity.setLocalScale(data.scale, data.scale, 1);
      })

    // Scale up
    scaleInTween.start();
    scaleInTween.onComplete(() => scaleOutTween.start());
    scaleOutTween.onComplete(() => this._isTween = false);
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