import "../style.css";

import * as pc from "playcanvas";
import * as CANNON from "cannon";
import CannonDebugger from "cannon-es-debugger";

import UIGroup from "./ui-container.js";
import Loader from "./loader.js";
import AssetsHelper from "./libs/assets-helper.js";
import GameScene from "./scene.js";


// import './libs/orbit-camera.js';

export default class Game {
  constructor() {
    this._canvas = null;
    this._app = null;
    this._assets = null;

    this._enableOrbit = true;

    this._init();
  }

  async _init() {
    const canvas = (this._canvas = document.createElement("canvas"));
    document.body.appendChild(canvas);

    const app = (this._app = new pc.Application(canvas, {
      keyboard: new pc.Keyboard(window),
      mouse: new pc.Mouse(canvas),
      touch: new pc.TouchDevice(canvas),
      resourceHandlers: [
        // @ts-ignore
        pc.TextureHandler,
        // @ts-ignore
        pc.FontHandler,
      ],
      componentSystems: [
        pc.RenderComponentSystem,
        pc.CameraComponentSystem,
        pc.LightComponentSystem,
        pc.ScriptComponentSystem,
        pc.CollisionComponentSystem,
        pc.RigidBodyComponentSystem,
        pc.AnimComponentSystem,
      ],
    }));

    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.scene.exposure = 0.8;
    // app.scene.skyboxMip = 20;

    AssetsHelper.registerApp(app);

    window.addEventListener("resize", () => this._resize(canvas));
    app.on("update", (dt) => this.update(dt));

    this._initLight();
    this._initCamera();

    new Loader(app);

    setTimeout(() => {
      this._initPhysics();
      this._initUI();
      this._initScene();

      app.start();
    }, 1000);
  }

  _resize(canvas) {
    this._app.resizeCanvas(canvas.width, canvas.height);
    // app.resizeCanvas(canvas.width, canvas.height);
  }

  _initUI() {
    // const app = this._app;
    // const uiEntity = new UIGroup(app, this._assets);
    // app.root.addChild(uiEntity);
  }

  _initScene() {
    const scene = new GameScene(this._app, this._physicsWorld);
    this._app.root.addChild(scene);
  }

  _initPhysics() {
    const world = (this._physicsWorld = new CANNON.World());
    world.gravity.set(0, -9.82, 0); // Set gravity to pull objects toward the negative Y axis

    world.solver.iterations = 10;
    world.broadphase = new CANNON.NaiveBroadphase();
  }

  _initCamera() {
    const camera = new pc.Entity("Camera");
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.1, 0.1),
    });

    this._app.root.addChild(camera);
    camera.setPosition(0, 1, 3);
    camera.lookAt(0, 0.5, 0);
  }

  _initLight() {
    const light = new pc.Entity("light");
    light.addComponent("light", {
      type: "directional",
      color: new pc.Color(1, 1, 1),
      intensity: 1,
    });

    this._app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    const light2 = new pc.Entity("light");
    light2.addComponent("light");

    this._app.root.addChild(light2);
    light2.setEulerAngles(0, 45, 0);
  }

  update(dt) {
    this._physicsWorld?.step(dt);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Game();
});
