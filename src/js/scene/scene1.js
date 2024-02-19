import * as pc from 'playcanvas';

export default class Scene1 extends pc.Entity {
  constructor() {
    super();

    this._init();
  }

  _init() {
    this._initCubes();
    this._initSpheres();
    // const Rotate = pc.createScript('rotate');
    // Rotate.prototype.update = function (dt) {
    //   this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
    // };

    // const box = new pc.Entity('cube');
    // box.addComponent('model', {
    //   type: 'box'
    // });

    // box.addComponent('script');
    // box.script.create('rotate');

    // this.addChild(box);
  }

  _initCubes() {
    const count = 5;
    const offset = -0.2;

    const cubes = new pc.Entity('cubes');

    for (let i = 0; i < count; i++) {
      const cube = this._createCube();

      const s = 0.2 - 0.02 * i;
      cube.setLocalScale(s, s, s);

      cube.setLocalPosition(offset * i * 2.5, -offset * i * 0, offset * i * 2);
      cubes.addChild(cube);
    }

    this.addChild(cubes);

    cubes.setPosition(-0.2, 0, 0);
  }

  _createCube() {
    const box = new pc.Entity('cube');
    box.addComponent('model', {
      type: 'box',
    });

    var material = new pc.StandardMaterial();

    material.diffuse = new pc.Color(1, 0, 0); // Red, for example
    
    material.update();

    box.model.material = material;

    return box;
  }

  _initSpheres() {
    const count = 6;
    const r = 0.5;

    const spheres = new pc.Entity('spheres');

    for (let i = 0; i < count; i++) {
      const sphere = this._createSphere();

      const s = Math.min(2 * Math.PI * r / count * 0.5, 0.3);
      sphere.setLocalScale(s, s, s);

      const alpha = (Math.PI * 2 / count) * i + Math.PI * 0.5;

      sphere.setLocalPosition(Math.cos(alpha) * r, Math.sin(alpha) * r, 0);
      spheres.addChild(sphere);
    }

    this.addChild(spheres);

    spheres.setPosition(0.8, 0, 0);

    const Rotate = pc.createScript('rotate');
    Rotate.prototype.update = function (dt) {
      this.entity.rotate(0, 0, 30 * dt);
    };

    spheres.addComponent('script');
    spheres.script.create('rotate');
  }

  _createSphere() {
    const box = new pc.Entity('sphere');
    box.addComponent('model', {
      type: 'sphere',
    });

    var material = new pc.StandardMaterial();

    material.diffuse = new pc.Color(0, 1, 0); // Red, for example
    
    material.update();

    box.model.material = material;

    return box;
  }
}