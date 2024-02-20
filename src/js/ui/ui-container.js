import * as pc from "playcanvas";
import IconButton from "./elements/icon-button.js";
import AssetsHelper from "../libs/assets-helper.js";
import SceneSwitcher from "./elements/screens-switcher.js";
import * as TWEEN from '@tweenjs/tween.js'
import StartText from "./elements/start-text.js";

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
    this._initShopBtn();
    this._initStartText();
    this._initSceneSwitcher();

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  _initSettingsBtn() {
    const settingsBtn = this._settingsBtn = new IconButton("settings");
    this.addChild(settingsBtn);
  }

  _initShopBtn() {
    const shopBtn = this._shopBtn = new IconButton("coin");
    this.addChild(shopBtn);
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
      console.log('direction: ' + direction)
      this.fire("changeScene", direction);
    })
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
    this._shopBtn.setLocalPosition(width * 0.5 - offset, height * 0.5 - offset, 0);
    this._startText.setLocalPosition(0, -height * 0.15, 0);

    this._sceneSwitcher.setLocalPosition(0, -height * 0.4, 0);
  }

  update(dt) {
    // Update logic for the screens if necessary
  }
}

// Register the component with the system
