import * as pc from "playcanvas";
import IconButton from "./elements/icon-button.js";
import AssetsHelper from "../libs/assets-helper.js";
import SceneSwitcher from "./elements/screens-switcher.js";
import * as TWEEN from '@tweenjs/tween.js'
import StartText from "./elements/start-text.js";
import SettingsPopup from "./popups/settings-popup.js";
import Counter from "./elements/counter.js";
import ShopPopup from "./popups/shop-popup.js";

export default class MyUIElement extends pc.Entity {
  constructor(app, assets) {
    super();

    this._app = app;
    this._assets = assets;
    this.screen1 = null;
    this.screen2 = null;

    this._init();
  }

  onStarted() {
    this._startText.hide();
    this._sceneSwitcher.show();
  }

  setSceneIndex(index) {
    this._sceneSwitcher.setSceneIndex(index);
  }

  _init() {
    this.addComponent("screen", {
      referenceResolution: new pc.Vec2(1280, 720),
      scaleBlend: 0.5,
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
    });

    this._initSettingsBtn();
    this._initStartText();
    this._initSceneSwitcher();
    this._initSettingsPopup();
    this._initCoinsCounter();
    this._initDiamondsCounter();

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  _initSettingsBtn() {
    const settingsBtn = this._settingsBtn = new IconButton("settings");
    this.addChild(settingsBtn);

    this._settingsBtn.on('click', () => {
      this._settingsPopup.show();
      this._onPopupShow();
    })
  }

  _initStartText() {
    const startText = this._startText = new StartText();
    this.addChild(startText);
    startText.show();
  }

  _initSceneSwitcher() {
    const sceneSwitcher = this._sceneSwitcher = new SceneSwitcher();
    this.addChild(sceneSwitcher);

    sceneSwitcher.hide();

    sceneSwitcher.on('click', (direction) => {
      this.fire("changeScene", direction);
    })
  }

  _initSettingsPopup() {
    const settingsPopup = this._settingsPopup = new SettingsPopup();
    this.addChild(settingsPopup);
  }

  _initSettingsPopup() {
    const shopPopup = this._shopPopup = new ShopPopup();
    this.addChild(shopPopup);
  }

  _initCoinsCounter() {
    const coinsCounter = this._coinsCounter = new Counter("coin");
    this.addChild(coinsCounter);

    coinsCounter.on('click', () => {
      this._shopPopup.show();
    });
  }

  _initDiamondsCounter() {
    const diamondsCounter = this._diamondsCounter = new Counter("diamond");
    this.addChild(diamondsCounter);

    diamondsCounter.on('click', () => {
      this._shopPopup.show();
    });
  }

  _onPopupShow() {

  }

  resize() {
    const screenEntity = this;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 720) {
      screenEntity.screen.scaleMode = pc.SCALEMODE_NONE;
    } else {
      screenEntity.screen.scaleMode = pc.SCALEMODE_BLEND;
    }

    screenEntity.screen.referenceResolution = new pc.Vec2(width, height);

    const offset = 70;

    this._settingsBtn.setLocalPosition(-width * 0.5 + offset, height * 0.5 - offset, 0);
    this._coinsCounter.setLocalPosition(width * 0.5 - offset - 300, height * 0.5 - offset, 0);
    this._diamondsCounter.setLocalPosition(width * 0.5 - offset - 60, height * 0.5 - offset, 0);
    this._startText.setLocalPosition(0, -height * 0.15, 0);

    this._sceneSwitcher.setLocalPosition(0, -height * 0.4, 0);
  }

  update(dt) {
    // Update logic for the screens if necessary
  }
}

// Register the component with the system
