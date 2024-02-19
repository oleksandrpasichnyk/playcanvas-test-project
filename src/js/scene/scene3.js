import * as pc from 'playcanvas';
import * as CANNON from 'cannon';
import MaterialsHelper from '../libs/materials-helper.js';

export default class Scene3 extends pc.Entity {
  constructor(app, world) {
    super();

    this._app = app;
    this._world = world;

    this._boxes = [];
    this._mouseDownTime = 0; // Track when the mouse was pressed down

    this._colors = [new pc.Color(0.8, 0.2, 0.5), new pc.Color(0.5, 0.8, 0.2), new pc.Color(0.2, 0.5, 0.8)]

    setTimeout(() => {
      
      this._init();
    }, 1000);
  }

  _init() {
    this._initGroundPlane();
    // this._createCube();

    this._app.on('update', (dt) => this.update(dt));
    this._app.mouse.on(pc.EVENT_MOUSEDOWN, this._onMouseDown, this);
    this._app.mouse.on(pc.EVENT_MOUSEUP, this._onMouseUp, this);
  }

  _onMouseDown(event) {
    // Record the current time when the mouse button is pressed
    this._mouseDownTime = Date.now();
}

_onMouseUp(event) {
    // Calculate how long the mouse was held down
    const holdDuration = Date.now() - this._mouseDownTime;

    // Get the camera entity and calculate the click direction
    const cameraEntity = this._app.root.findByName('Camera');
    const from = cameraEntity.getPosition();
    const to = cameraEntity.camera.screenToWorld(event.x, event.y, cameraEntity.camera.farClip);
    const direction = to.sub(from).normalize();

    // Spawn and throw the box with impulse power based on hold duration
    this._spawnBox(from, direction, holdDuration);
}


  _initGroundPlane() {
    const planeEntity = new pc.Entity("plane");
    planeEntity.addComponent("model", {
        type: "plane"
    });


    const width = 100;

    planeEntity.setLocalScale(width, 1, width);
    planeEntity.setLocalPosition(0, -0.5, 0);
    this._app.root.addChild(planeEntity);
    
    planeEntity.model.material = MaterialsHelper.createMaterial(new pc.Color(0.6, 0.6, 0.6));

    const groundShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, 0.25, width * 0.5));
    const groundBody = new CANNON.Body({
        mass: 0,
        shape: groundShape,
        position: new CANNON.Vec3(0, -0.5, 0)
    });

    this._world.addBody(groundBody);
  }

  _spawnBox(position, direction, holdDuration) {
    const boxEntity = new pc.Entity("cube");
    boxEntity.addComponent("model", {
        type: "box"
    });

    const s = 0.5;
    boxEntity.setLocalScale(s, s, s);
    boxEntity.setLocalPosition(position.x, position.y, position.z);
    this._app.root.addChild(boxEntity);

    const color = this._colors[Math.floor(Math.random() * this._colors.length)]
    boxEntity.model.material = MaterialsHelper.createMaterial(color);

    const boxShape = new CANNON.Box(new CANNON.Vec3(s * 0.5, s * 0.5, s * 0.5));
    const boxBody = new CANNON.Body({
        mass: 1,
        position: position,
        shape: boxShape
    });
    this._world.addBody(boxBody);

    const baseImpulse = 20;
    const forceMagnitude = baseImpulse + (holdDuration / 1000) * 20; // Increase force based on duration
    const force = direction.scale(forceMagnitude);

    boxBody.applyImpulse(force, new CANNON.Vec3(position.x, position.y, position.z));

    this._boxes.push({boxEntity, boxBody});
  }


  update() {
    if(this._boxes.length > 0) {
      this._boxes.forEach(data => {
        const { boxEntity, boxBody } = data;

        boxEntity.setPosition(boxBody.position.x, boxBody.position.y, boxBody.position.z);
        boxEntity.setRotation(boxBody.quaternion.x, boxBody.quaternion.y, boxBody.quaternion.z, boxBody.quaternion.w);
      })
    }
  }
}