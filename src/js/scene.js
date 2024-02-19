import * as pc from "playcanvas";
import Scene1 from "./scene/scene1.js";
import Scene2 from "./scene/scene2.js";
import Scene3 from "./scene/scene3.js";

export default class GameScene extends pc.Entity {
  constructor(app, world) {
    super();

    this._app = app;
    this._world = world;

    this._init();
  }

  _init() {
    this._initScene1();
    // this._initScene2();
    // this._initScene3();
  }

  _initScene1() {
    const scene = new Scene1(this._app, this._physicsWorld);
    this._app.root.addChild(scene);
  }

  _initScene2() {
    const scene = new Scene2(this._app, this._physicsWorld);
    this._app.root.addChild(scene);
  }

  _initScene3() {
    const scene = new Scene3(this._app, this._physicsWorld);
    this._app.root.addChild(scene);
  }
}
