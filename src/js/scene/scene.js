import * as pc from "playcanvas";
import Scene1 from "./scenes/scene1.js";
import Scene2 from "./scenes/scene2.js";
import Scene3 from "./scenes/scene3.js";

export default class GameScene extends pc.Entity {
  constructor(app, world) {
    super();

    this._app = app;
    this._world = world;

    this._scene1 = null;
    this._scene2 = null;
    this._scene3 = null;

    this._scenesData = {};

    this._sceneIndex = 1;
    this._scenesCount = 3;

    this._init();
  }

  onLeftClicked() {
    this._sceneIndex = this._sceneIndex == 1 ? this._scenesCount : this._sceneIndex - 1;

    this.setScene(this._sceneIndex);
  }

  onRightClicked() {
    this._sceneIndex = this._sceneIndex == this._scenesCount ? 1 : this._sceneIndex + 1;

    this.setScene(this._sceneIndex);
  }

  setScene(index = this._sceneIndex) {
    this._sceneIndex = index;

    for (const key in this._scenesData) {
      const scene = this._scenesData[key];

      scene.disable();
    }

    const selectedScene = this._scenesData[index];

    if(selectedScene) {
      selectedScene.enable();
    }
  }

  _init() {
    this._initScene1();
    this._initScene2();
    this._initScene3();
  }

  _initScene1() {
    const scene = this._scene1 = new Scene1(this._app, this._world);
    this._app.root.addChild(scene);

    scene.disable();
    this._scenesData[1] = scene;
  }

  _initScene2() {
    const scene = this._scene2 = new Scene2(this._app, this._world);
    this._app.root.addChild(scene);

    scene.disable();
    this._scenesData[2] = scene;
  }

  _initScene3() {
    const scene = this._scene3 = new Scene3(this._app, this._world);
    this._app.root.addChild(scene);

    scene.disable();
    this._scenesData[3] = scene;
  }
}
