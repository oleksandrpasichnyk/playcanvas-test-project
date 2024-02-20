import * as pc from "playcanvas";
import MaterialsHelper from "../../libs/materials-helper.js";
import * as lil from 'lil-gui';
import SceneAbstract from "./scene-abstract.js";

export default class Scene1 extends SceneAbstract {
  constructor() {
    super();

    this._spheresCount = 5;
    this._spheresPool = [];
    this._spheresContainer = null;
    this._spheresContainerRadius = 0.5;

    this._gui = null;

    this._init();
  }

  enable() {
    super.enable();
    
    this._gui.show();
  }

  disable() {
    super.disable();
    
    this._gui.hide();
  }

  _init() {
    this._initGUI();
    this._initCubes();
    this._initSpheres();
  }

  _initGUI() {
    const gui = this._gui = new lil.GUI();

    gui.add(this, '_spheresCount', 1, 50, 1).name('Spheres count:');
    gui.add({ apply: () => this._applySphereCount(this._spheresCount) }, 'apply').name('Apply');
  }

  _initCubes() {
    const count = 5;
    const offset = -0.2;

    const cubes = new pc.Entity("cubes");

    for (let i = 0; i < count; i++) {
      const cube = this._createCube();

      const s = 0.2 - 0.02 * i;
      cube.setLocalScale(s, s, s);

      cube.setLocalPosition(offset * i * 2.5, -offset * i * 0, offset * i * 2);
      cubes.addChild(cube);
    }

    this.addChild(cubes);

    cubes.setPosition(-0.4, 0.5, 0);
  }

  _createCube() {
    const box = new pc.Entity("cube");
    box.addComponent("model", {
      type: "box",
    });

    box.model.material = MaterialsHelper.createMaterial(new pc.Color(1, 0, 0));

    return box;
  }

  _initSpheres() {
    const spheres = this._spheresContainer = new pc.Entity("spheres");
    this.addChild(spheres);

    spheres.setPosition(0.8, 0.5, 0);

    const Rotate = pc.createScript("rotate");
    Rotate.prototype.update = function (dt) {
      this.entity.rotate(0, 0, 30 * dt);
    };

    spheres.addComponent("script");
    spheres.script.create("rotate");

    this._setSpheresCount();
    this._setSpheresPositions();
  }

  _setSpheresCount(count = this._spheresCount) {
    const r = this._spheresContainerRadius;

    if(count > this._spheresPool.length) {
      const diff = count - this._spheresPool.length;

      for (let i = 0; i < diff; i++) {
        this._createSphere();        
      }
    }

    this._spheresPool.forEach(s => s.enabled = false);

    for (let i = 0; i < count; i++) {
      const sphere = this._spheresPool[i];
      sphere.enabled = true;

      const s = Math.min(((2 * Math.PI * r) / count) * 0.5, 0.3);
      sphere.setLocalScale(s, s, s);      
    }
  }

  _setSpheresPositions() {
    const r = this._spheresContainerRadius;

    this._spheresPool.forEach((sphere, i) => {
      const angle = ((Math.PI * 2) / this._spheresCount) * i + Math.PI * 0.5;

      sphere.setLocalPosition(Math.cos(angle) * r, Math.sin(angle) * r, 0);
    })
  }

  _createSphere() {
    const sphere = new pc.Entity("sphere");
    sphere.addComponent("model", {
      type: "sphere",
    });

    sphere.model.material = MaterialsHelper.createMaterial(new pc.Color(0, 1, 0));
    this._spheresPool.push(sphere);
    this._spheresContainer.addChild(sphere);

    return sphere;
  }

  _applySphereCount(count) {
    if(!this._isEnable) {
      return;
    }

    this._setSpheresCount(count);
    this._setSpheresPositions();
  }
}
