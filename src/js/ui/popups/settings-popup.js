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
