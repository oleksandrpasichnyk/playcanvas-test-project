import * as pc from "playcanvas";

export default class SceneAbstract extends pc.Entity {
  constructor() {
    super();

    this._isEnable = true;
  }

  enable() {
    this.enabled = true; 
    this._isEnable = true;
  }

  disable() {
    this.enabled = false;
    this._isEnable = false;
  }
}
