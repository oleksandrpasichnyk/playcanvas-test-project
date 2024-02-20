import * as pc from 'playcanvas';
import Icon from './icon.js';
import AssetsHelper from '../../libs/assets-helper.js';
import * as TWEEN from '@tweenjs/tween.js'
import IconButton from './icon-button.js';

export default class Counter extends pc.Entity {
  constructor(icon = null) {
    super();

    this._icon = icon;
    this.useInput = true;

    this._isTween = false;
    this._count = 0; // get from local storage

    this._init();
  }

  increase() {
    this._count++;
    this._text.element.text = this._count;

    // save local storage
  }

  _init() {
    this._initBg();
    
    this._initIcon();
    this._initPlusBtn();
    this._initText();
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

    textEntity.setLocalPosition(-30, -3, 0)
    this.addChild(textEntity);
  }

  _initIcon() {
    const icon = new Icon(this._icon);
    this.addChild(icon);

    icon.setLocalScale(0.8, 0.8, 0.8);
    icon.setLocalPosition(-60, 0, 0);
  }

}