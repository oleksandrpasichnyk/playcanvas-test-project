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
      script: new pc.Asset('script', 'script', { url: 'scripts/orbit-camera.js' })
    };

    function loadAssets(assetList, assetRegistry) {
      return new Promise(resolve => {
        const assetListLoader = new pc.AssetListLoader(assetList, assetRegistry);
        assetListLoader.load(resolve);
      });
    }
    await loadAssets(Object.values(assets), app.assets);

    // const scriptAsset = new pc.Asset('script', 'script', { url: 'scripts/orbit-camera.js' });
    // app.assets.add(scriptAsset);
    // app.assets.load(scriptAsset);
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
      url: 'icons/' + path
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
      bg: 'bg.png',
      particle: 'particle.png',
      arrow: 'arrow.png',
    }

    for (const imageName in images) {
      const imagePath = images[imageName];
      this._loadImage(imageName, imagePath)
    }
  }
}