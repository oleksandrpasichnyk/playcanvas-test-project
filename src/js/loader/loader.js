import * as pc from 'playcanvas';

export default class Loader {
  constructor(app) {

    this._app = app;

    this._loadFonts();
    this._loadImages();
    // this._loadScripts();
  }

  async _loadScripts() {
    const app = this._app;

    const assets = {
      script: new pc.Asset('script', 'script', { url: 'scripts/tween.js' })
    };

    function loadAssets(assetList, assetRegistry) {
      return new Promise(resolve => {
        const assetListLoader = new pc.AssetListLoader(assetList, assetRegistry);
        assetListLoader.load(resolve);
      });
    }
    await loadAssets(Object.values(assets), app.assets);

    // const app = this._app;

    // const fontAsset = new pc.Asset('script', 'script', { url: 'scripts/tween.js' });
    // app.assets.add(fontAsset);
    // app.assets.load(fontAsset);
  }

  _loadFonts() {
    const app = this._app;

    const fontAsset = new pc.Asset('font', 'font', { url: 'fonts/arial.json' });
    app.assets.add(fontAsset);
    app.assets.load(fontAsset);
  }

  _loadImage(name, path) {
    const app = this._app;

    const iconAsset = new pc.Asset(name, 'texture', {
      url: 'images/' + path
    });
    app.assets.add(iconAsset);
    app.assets.load(iconAsset);

    iconAsset.ready(function () {

    });
  }

  _loadImages() {
    const images = {
      settings: 'settings.png',
      coin: 'coin.png',
      diamond: 'diamond.png',
      coin_white: 'coin_white.png',
      diamond_white: 'diamond_white.png',
      bg: 'bg.png',
      bg2: 'bg2.png',
      bg2_color: 'bg2_color.png',
      particle: 'particle.png',
      arrow: 'arrow.png',
      popup_bg: 'popup_bg.png',
      close: 'close.png',
      plus: 'plus.png',
      plus_white: 'plus_white.png',
      bg_image: 'bg_image.jpg',
    }

    for (const imageName in images) {
      const imagePath = images[imageName];
      this._loadImage(imageName, imagePath)
    }
  }
}