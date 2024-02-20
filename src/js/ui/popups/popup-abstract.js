import * as pc from 'playcanvas';
import AssetsHelper from '../../libs/assets-helper.js';
import * as TWEEN from '@tweenjs/tween.js'
import IconButton from '../elements/icon-button.js';

export default class PopupAbstract extends pc.Entity {
  constructor() {
    super();

    this.enabled = false;
    this._isEnable = false;
    this._isTween = false;
  }

  show() {
    if(this._isTween || this._isEnable) {
      return;
    }

    this._isTween = true;

    this.enabled = true;
    this._isEnable = true;

    new TWEEN.Tween({ scale: 0 })
      .to({ scale: 1 }, 300)
      .easing(TWEEN.Easing.Back.Out)
      .onUpdate((data) => {
        this.setLocalScale(data.scale, data.scale, 1);
      })
      .start()
      .onComplete(() => {
        this._isTween = false;
      });
  }

  hide() {
    if(this._isTween) {
      return;
    }

    this._isTween = true;

    new TWEEN.Tween({ scale: 1 })
      .to({ scale: 0 }, 300)
      .easing(TWEEN.Easing.Back.In)
      .onUpdate((data) => {
        this.setLocalScale(data.scale, data.scale, 1);
      })
      .start()
      .onComplete(() => {
        this._isTween = false;
        this.enabled = false;
        this._isEnable = false;
      });
  }

  _init() {
    this._initBg();
    this._initTitle();
    this._initCloseBtn();
  }

  _initBg() {
    const bgAsset = AssetsHelper.getAssetByName('popup_bg', 'texture');

    this.addComponent('element', {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: 500,
      height: 500,
      textureAsset: bgAsset,
      useInput: true,
    });
  }

  _initTitle() {
    const textEntity = this._startText = new pc.Entity('Text Entity');

    textEntity.addComponent('element', {
      type: 'text',
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      text: this._titleText,
      fontAsset: AssetsHelper.getAssetByName('font', 'font'),
      fontSize: 40,
      color: [0, 0, 0, 0.8],
      width: 200,
      height: 50,
      weight: 600,
      alignment: pc.Vec2.ZERO
    });

    this.addChild(textEntity);

    textEntity.setLocalPosition(0, 183, 0);
  }

  _initCloseBtn() {
    const closeBtn = this._closeBtn = new IconButton('close', false);
    this.addChild(closeBtn);

    closeBtn.setLocalScale(0.7, 0.7, 1);
    closeBtn.setLocalPosition(185, 185, 0);

    closeBtn.on('click', () => {
      setTimeout(() => {
        this.hide();
      }, 100);
    });
  }
}
