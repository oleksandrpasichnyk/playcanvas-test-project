import * as pc from 'playcanvas';
import * as CANNON from 'cannon';

export default class Scene3 extends pc.Entity {
  constructor(app, world) {
    super();

    this._app = app;
    this._world = world;

    setTimeout(() => {
      
      this._init();
    }, 1000);
  }

  _init() {
    this._initPlane();
    this._createCube();

    this._app.on('update', (dt) => this.update(dt))
  }

  _initPlane() {
    const planeEntity = this._planeEntity = new pc.Entity("plane");
    planeEntity.addComponent("model", {
        type: "plane"
    });
    planeEntity.setLocalScale(10, 1, 10); // Large enough to act as ground
    planeEntity.setLocalPosition(0, -0.5, 0); // Positioned to be the ground
    this._app.root.addChild(planeEntity);
    
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color(0, 0, 0.1); // Red, for example
    material.update();
    planeEntity.model.material = material;

    // Create Cannon.js ground body
    const groundShape = new CANNON.Box(new CANNON.Vec3(5, 0.25, 5));
    const groundBody = this._planeBody = new CANNON.Body({
        mass: 0,
        shape: groundShape,
        position: new CANNON.Vec3(0, -0.5, 0) // Match the PlayCanvas plane's position
    });
    this._world.addBody(groundBody);
  }

  _createCube() {
    const boxEntity = this._boxEntity = new pc.Entity("cube");
    boxEntity.addComponent("model", {
      type: "box"
    });

    const s = 0.2;
    boxEntity.setLocalScale(s, s, s);
    boxEntity.setLocalPosition(0, 2, 0);
    this._app.root.addChild(boxEntity);

    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color(1, 0, 0); // Red, for example
    material.update();
    boxEntity.model.material = material;

    // Create Cannon.js physics body
    const boxShape = new CANNON.Box(new CANNON.Vec3(s * 0.5, s * 0.5, s * 0.5));
    const boxBody = this._boxBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 2, 0),
      shape: boxShape
    });
    this._world.addBody(boxBody);
  }

  update() {
    this._boxEntity.setPosition(this._boxBody.position.x, this._boxBody.position.y, this._boxBody.position.z);
    this._boxEntity.setRotation(this._boxBody.quaternion.x, this._boxBody.quaternion.y, this._boxBody.quaternion.z, this._boxBody.quaternion.w);

    this._planeEntity.setPosition(this._planeBody.position.x, this._planeBody.position.y, this._planeBody.position.z);
    this._planeEntity.setRotation(this._planeBody.quaternion.x, this._planeBody.quaternion.y, this._planeBody.quaternion.z, this._planeBody.quaternion.w);
  }
}