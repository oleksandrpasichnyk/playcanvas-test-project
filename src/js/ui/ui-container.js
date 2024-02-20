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

    this._settingsBtn.enabled = false;
    this._coinsCounter.enabled = false;
    this._diamondsCounter.enabled = false;
    this._bg.enabled = false;
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

    this._initBg();
    this._initSettingsBtn();
    this._initStartText();
    this._initSceneSwitcher();
    this._initSettingsPopup();
    this._initCoinsCounter();
    this._initDiamondsCounter();
    this._initShopPopup();

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  _initBg() {
    const bg = this._bg = new pc.Entity();
    const iconAsset = AssetsHelper.getAssetByName('bg_image', 'texture');
    
    this._startBgWidth = iconAsset.resource.width;
    this._startBgHeight = iconAsset.resource.height;
    
    bg.addComponent('element', {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      // width: this._startBgWidth,
      // height: this._startBgHeight,
      textureAsset: iconAsset,
    });

    this.addChild(bg);
    this._resizeBg();
  }

  _initSettingsBtn() {
    const settingsBtn = this._settingsBtn = new IconButton("settings");
    this.addChild(settingsBtn);

    this._settingsBtn.on('click', () => {
      this._settingsPopup.show();
      this._shopPopup.hide(true);
      this._onPopupShow();
    })
  }

  _initStartText() {
    const startText = this._startText = new StartText();
    this.addChild(startText);
    startText.show();

    startText.on('click', () => this.fire('first_click'))
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

  _initShopPopup() {
    const shopPopup = this._shopPopup = new ShopPopup();
    this.addChild(shopPopup);

    shopPopup.on('click_diamond', () => this._diamondsCounter.increase());
    shopPopup.on('click_coin', () => this._coinsCounter.increase());
  }

  _initCoinsCounter() {
    const coinsCounter = this._coinsCounter = new Counter("coin", "coins");
    this.addChild(coinsCounter);

    coinsCounter.on('click', () => {
      this._shopPopup.show();
      this._settingsPopup.hide(true);
    });
  }

  _initDiamondsCounter() {
    const diamondsCounter = this._diamondsCounter = new Counter("diamond", "diamonds");
    this.addChild(diamondsCounter);

    diamondsCounter.on('click', () => {
      this._shopPopup.show();
      this._settingsPopup.hide(true);
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

    this._resizeBg();
  }

  _resizeBg() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scaleX = this._bg.element.width/this._startBgWidth;
    const scaleY = this._bg.element.height/this._startBgHeight;

    if(width > height) {
      this._bg.element.width = width * 1.1;
      this._bg.element.height = this._startBgHeight * scaleX * 1.1;
    } else{
      this._bg.element.height = height * 1.1;
      this._bg.element.width = this._startBgWidth * scaleY * 1.1;
    }
  }

  update(dt) {
    // Update logic for the screens if necessary
  }
}

// Register the component with the system
