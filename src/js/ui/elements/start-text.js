import * as pc from 'playcanvas';
import AssetsHelper from '../../libs/assets-helper.js';
import * as TWEEN from '@tweenjs/tween.js'

export default class StartText extends pc.Entity {
  constructor() {
    super();

    this._isEnable = true;
    this.useInput = true;

    this._init();
  }

  show() {
    this.enabled = true;
    this._isEnable = true;

    this._textTween.start();
  }

  hide() {
    this.enabled = false;
    this._isEnable = false;

    this._textTween.stop();
  }

  _init() {
    this.addComponent("element", {
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: 200,
      height: 100,
      useInput: true
    });

    this.element.on('click', () => {
      this.fire('click')
    });

    const textEntity = this._startText = new pc.Entity('Text Entity');

    textEntity.addComponent('element', {
      type: 'text',
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      text: 'TAP TO START',
      fontAsset: AssetsHelper.getAssetByName('font', 'font'),
      fontSize: 32,
      color: [1, 1, 1, 0.8],
      width: 200,
      height: 50,
      alignment: pc.Vec2.ZERO
    });

    this.addChild(textEntity);

    this._textTween = new TWEEN.Tween({ scale: 1 })
      .to({ scale: 1.08 }, 500)
      .easing(TWEEN.Easing.Sinusoidal.In)
      .delay(50)
      .yoyo(true)
      .repeatDelay(100)
      .repeat(1000)
      .onUpdate((data) => {
        textEntity.setLocalScale(data.scale, data.scale, 1);
      });
  }
}
