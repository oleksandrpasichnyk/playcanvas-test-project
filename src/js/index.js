import '../style.css';

import * as pc from 'playcanvas';
import UIGroup from './ui-container.js';
import Loader from './loader.js';
import AssetsHelper from './libs/assets-helper.js';
import Scene1 from './scene/scene1.js';
import Scene2 from './scene/scene2.js';
// import './libs/orbit-camera.js';

export default class Game {
  constructor() {
    this._canvas = null;
    this._app = null;
    this._timer = 0;
    this._assets = null;

    this._enableOrbit = true;

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

    AssetsHelper.registerApp(app);

    window.addEventListener('resize', () => this._resize(canvas));
    app.on("update", (dt) => this.update(dt));

    this._initLight();
    this._initCamera();
    
    new Loader(app);
    
    setTimeout(() => {
      this._initScene();
      this._initUI();
      app.start();
    }, 1000);
  }

  _resize(canvas) {
    this._app.resizeCanvas(canvas.width, canvas.height);
    // app.resizeCanvas(canvas.width, canvas.height);

  }

  _initUI() {
    const app = this._app;

    const uiEntity = new UIGroup(app, this._assets);
    app.root.addChild(uiEntity);
  }

  _initScene() {
    const scene = new Scene2();
    this._app.root.addChild(scene); 
  }

  _initCamera() {
    const camera = new pc.Entity('camera');
    camera.addComponent('camera', {
      clearColor: new pc.Color(0.1, 0.1, 0.1)
    });

    // if(this._enableOrbit) {
    //   camera.addComponent("script");
    //   camera.script.create("orbitCamera", {
    //       attributes: {
    //           inertiaFactor: 0.2
    //       }
    //   });
    //   camera.script.create("orbitCameraInputMouse");
    //   camera.script.create("orbitCameraInputTouch");
    // }

    this._app.root.addChild(camera);
    camera.setPosition(1, 0.3, 3);
    camera.lookAt(0, 0, 0);
  }

  _initLight() {
    const light = new pc.Entity('light');
    light.addComponent('light', {
      type: "directional",
      color: new pc.Color(1, 1, 1),
      intensity: 1,
  });

    this._app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    const light2 = new pc.Entity('light');
    light2.addComponent('light');

    this._app.root.addChild(light2);
    light2.setEulerAngles(0, 45, 0);
  }

  update(dt) {
    this._timer += dt;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Game();
});