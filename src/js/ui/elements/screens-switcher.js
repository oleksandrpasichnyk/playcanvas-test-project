import * as pc from 'playcanvas';
import IconButton from './icon-button.js';

export default class SceneSwitcher extends pc.Entity {
  constructor() {
    super();

    this._init();
  }

  _init() {
    this.addComponent("screen", {
      referenceResolution: new pc.Vec2(1280, 720),
      scaleBlend: 0.5,
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
    });
    
    this._initLeftArrow();
    this._initRightArrow();
  }

  _initLeftArrow() {
    const leftArrow = this._leftArrow = new IconButton("arrow");
    leftArrow.setLocalScale(0.5, 0.5, 0.5);
    leftArrow.setLocalPosition(-100, 0, 0);
    leftArrow.setLocalEulerAngles(0, 0, 180);
    this.addChild(leftArrow);

    leftArrow.on('click1', () => console.log('left'))
  }

  _initRightArrow() {
    const rightArrow = this._rightArrow = new IconButton("arrow");
    rightArrow.setLocalScale(0.5, 0.5, 0.5);
    rightArrow.setLocalPosition(100, 0, 0);
    this.addChild(rightArrow);
  }

}