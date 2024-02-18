import '../style.css';

import * as pc from 'playcanvas';
import UIGroup from './ui-container.js';
import Loader from './loader.js';

export default class Game {
  constructor() {
    this._canvas = null;
    this._app = null;
    this._timer = 0;
    this._assets = null;

    this._init();
  }

  _init() {
    const canvas = this._canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const app = this._app = new pc.Application(canvas,     {
      keyboard: new pc.Keyboard(window),
      mouse: new pc.Mouse(canvas),
      touch: new pc.TouchDevice(canvas),
      resourceHandlers: [
        // @ts-ignore
        pc.TextureHandler,
        // @ts-ignore
        pc.FontHandler
      ]
    });

    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    window.addEventListener('resize', () => this._resize());
    app.on("update", (dt) => this.update(dt));

    // this._initScene();
    this._initCamera();
    this._initLight();

    new Loader(app);

    // const assetListLoader = new pc.AssetListLoader(Object.values(this._assets), app.assets);
    // assetListLoader.load(() => {
    //   this._initUI();

    //   console.log(app.assets)

    //   app.start();
    // });

    // var fontJsonUrl = 'fonts/courier.json'; // The path to your JSON font file relative to index.js
    // var fontTextureUrl = 'fonts/courier.png'; // The path to your font image file

    // // // Load the font texture
    // var fontTextureAsset = new pc.Asset('fontTexture', 'texture', { url: fontTextureUrl });
    // this._app.assets.add(fontTextureAsset);
    // this._app.assets.load(fontTextureAsset);

    this._initUI();
    app.start();
  }

  _resize() {
    this._app.resizeCanvas();
  }

  _initUI() {
    const app = this._app;

    const uiEntity = new UIGroup(app, this._assets);
    app.root.addChild(uiEntity);
  }

  _initScene() {
    const Rotate = pc.createScript('rotate');
    Rotate.prototype.update = function (dt) {
      this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
    };

    const box = new pc.Entity('cube');
    box.addComponent('model', {
      type: 'box'
    });

    box.addComponent('script');
    box.script.create('rotate');

    this._app.root.addChild(box);
  }

  _initCamera() {
    const camera = new pc.Entity('camera');
    camera.addComponent('camera', {
      clearColor: new pc.Color(1, 1, 1)
    });

    this._app.root.addChild(camera);
    camera.setPosition(0, 0, 3);
  }

  _initLight() {
    const light = new pc.Entity('light');
    light.addComponent('light');

    this._app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);
  }

  update(dt) {
    this._timer += dt;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Game();
});