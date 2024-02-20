import ShopCounter from '../elements/shop-counter.js';
import PopupAbstract from './popup-abstract.js';

export default class ShopPopup extends PopupAbstract {
  constructor() {
    super();

    this._titleText = "SHOP"
    this._init();
  }

  _init() {
    super._init();

    this._initCoinsCounter();
    this._initDiamondsCounter();
  }

  _initCoinsCounter() {
    const coinsCounter = this._coinsCounter = new ShopCounter('coin_white');
    this.addChild(coinsCounter);

    coinsCounter.setLocalScale(0.8, 0.8, 0.8);

    coinsCounter.on('click', () => this.fire('click_coin'));
  }

  _initDiamondsCounter() {
    const diamondsCounter = this._diamondsCounter = new ShopCounter('diamond_white');
    this.addChild(diamondsCounter);

    diamondsCounter.setLocalScale(0.8, 0.8, 0.8);
    diamondsCounter.setLocalPosition(0, -100, 0);

    diamondsCounter.on('click', () => this.fire('click_diamond'));
  }
}
