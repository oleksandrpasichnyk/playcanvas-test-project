import * as pc from 'playcanvas';
import IconButton from './icon-button.js';
import AssetsHelper from '../../libs/assets-helper.js';

export default class SceneSwitcher extends pc.Entity {
  constructor() {
    super();

    this._width = 300;
    this._sceneIndex = 1;

    this._isEnable = true;

    this._init();
  }

  show() {
    this.enabled = true;
    this._isEnable = true;
  }

  hide() {
    this.enabled = false;
    this._isEnable = false;
  }

  setSceneIndex(index = this._sceneIndex) {
    this._sceneIndex = index;

    this._text.element.text = "Scene " + index;
  }

  _init() {
    this.addComponent("element", {
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
    });
    
    this._initLeftArrow();
    this._initRightArrow();
    this._initText();
  }

  _initLeftArrow() {
    const leftArrow = this._leftArrow = new IconButton("arrow");
    leftArrow.setLocalScale(0.5, 0.5, 0.5);
    leftArrow.setLocalPosition(-this._width * 0.5, 0, 0);
    leftArrow.setLocalEulerAngles(0, 0, 180);
    this.addChild(leftArrow);

    leftArrow.on('click', () => this._onClick('left'))
  }

  _initRightArrow() {
    const rightArrow = this._rightArrow = new IconButton("arrow");
    rightArrow.setLocalScale(0.5, 0.5, 0.5);
    rightArrow.setLocalPosition(this._width * 0.5, 0, 0);
    this.addChild(rightArrow);

    rightArrow.on('click', () => this._onClick('right'))
  }

  _initText() {
    const textEntity = this._text = new pc.Entity('Text');

    textEntity.addComponent('element', {
      type: 'text',
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      text: 'TAP TO START',
      fontAsset: AssetsHelper.getAssetByName('font', 'font'),
      fontSize: 25,
      color: [1, 1, 1, 0.8],
      width: this._width,
      height: 50,
      alignment: pc.Vec2.ZERO
    });

    textEntity.setLocalPosition(0, -3, 0)
    this.addChild(textEntity);

    this.setSceneIndex();
  }

  _onClick(direction) {
    if(!this._isEnable) {
      return
    }

    this.fire('click', direction);
  }
}