import * as pc from 'playcanvas';
import AssetsHelper from '../../libs/assets-helper.js';
import * as TWEEN from '@tweenjs/tween.js'
import PopupAbstract from './popup-abstract.js';

export default class SettingsPopup extends PopupAbstract {
  constructor() {
    super();

    this._titleText = "SETTINGS"
    this._init();
  }

  _init() {
    super._init();
  }
}
