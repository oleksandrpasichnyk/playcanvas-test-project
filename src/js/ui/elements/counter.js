import * as pc from 'playcanvas';
import Icon from './icon.js';
import AssetsHelper from '../../libs/assets-helper.js';
import * as TWEEN from '@tweenjs/tween.js'
import IconButton from './icon-button.js';

export default class Counter extends pc.Entity {
  constructor(icon = null, needBg = true) {
    super();

    this._icon = icon;
    this.useInput = true;
    this._needBg = needBg;

    this._isTween = false;
    this._count = 100;

    this._init();
  }

  _init() {
    // this.addComponent("element", {
    //   anchor: [0.5, 0.5, 0.5, 0.5],
    //   pivot: [0.5, 0.5],
    // });

    this._initBg();
    
    this._initIcon();
    this._initPlusBtn();
    this._initText();

    // this.button.useInput = true;
    // this.button.on('click', this._onClick, this);
  }

  _onClick() {
    if (this._isTween) return;

    console.log('_onClick')

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
    const bgAsset = AssetsHelper.getAssetByName('bg2', 'texture');

    this.addComponent('element', {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: 222,
      height: 100,
      textureAsset: bgAsset,
      useInput: true,
    });
  }

  _initPlusBtn() {
    const icon = new IconButton('plus', false);
    this.addChild(icon);

    icon.setLocalScale(0.5, 0.5, 0.5);
    icon.setLocalPosition(70, 0, 0);

    icon.on('click', () => this.fire('click'));
  }

  _initText() {
    const textEntity = this._text = new pc.Entity('Text');

    textEntity.addComponent('element', {
      type: 'text',
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0, 0.5],
      text: this._count,
      fontAsset: AssetsHelper.getAssetByName('font', 'font'),
      fontSize: 50,
      color: [0, 0, 0, 0.8],
      width: 50,
      height: 50,
      alignment: pc.Vec2.LEFT
    });

    textEntity.setLocalPosition(-35, -3, 0)
    this.addChild(textEntity);
  }

  _initIcon() {
    const icon = new Icon(this._icon);
    this.addChild(icon);

    icon.setLocalScale(0.8, 0.8, 0.8);
    icon.setLocalPosition(-60, 0, 0);
  }

}