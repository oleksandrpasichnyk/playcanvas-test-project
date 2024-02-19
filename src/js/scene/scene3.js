import * as pc from 'playcanvas';


export default class Scene3 extends pc.Entity {
  constructor(app) {
    super();

    this._app = app;
    this._init();
  }

  _init() {
    this._initPlane();

    this._createCube();
  }

  _initPlane() {
    const planeEntity = new pc.Entity('Plane');
    planeEntity.addComponent('model', {
      type: 'plane',
      width: 10,
      height: 10
    });

    const material = new pc.StandardMaterial();
    material.diffuse.set(0.8, 0.8, 0.8);
    material.update();
    planeEntity.model.material = material;

    this._app.root.addChild(planeEntity);

    // planeEntity.setLocalScale(10, 1, 10);
    planeEntity.setLocalPosition(0, 0, 0);

    planeEntity.addComponent('rigidbody', {
      type: 'static',
      mass: 1,
      restitution: 0.5
    });

    planeEntity.addComponent('collision', {
      type: 'box',
      halfExtents: new pc.Vec3(5, 0,1, 5) // Half the size of the scale set above, with a small Y value
    });
  }

  _createCube() {
    var box = new pc.Entity('Box');

// Set scale and rotation
box.setLocalScale(1, 1, 1); // Scale
box.setLocalPosition(0, 1, 0); // Scale
box.setLocalEulerAngles(0, 0, 0); // Rotation

// Add and configure the render component (model component in PlayCanvas)
box.addComponent('model', {
    type: 'box', // Using a simple box model
    castShadows: true,
    receiveShadows: true
    // Note: Some properties like 'isStatic', 'castShadowsLightmap', and 'lightmapped' are not directly available in the model component API and are typically managed through lightmap settings in the editor or material settings.
});

// Add and configure the rigidbody component
box.addComponent('rigidbody', {
    type: 'dynamic',
    mass: 10,
    linearDamping: 0,
    angularDamping: 0,
    linearFactor: new pc.Vec3(1, 1, 1),
    angularFactor: new pc.Vec3(1, 1, 1),
    friction: 0.5,
    restitution: 0.5
});

// Add and configure the collision component
box.addComponent('collision', {
    type: 'box',
    halfExtents: new pc.Vec3(0.5, 0.5, 0.5)
    // Note: Properties like 'radius', 'axis', 'height', 'asset', 'renderAsset', 'linearOffset', and 'angularOffset' are specific to other types of collision components or not directly applicable to the 'box' type in code.
});

// Enable the entity (this is the default state)
box.enabled = true;

// Add the box entity to the hierarchy
// Assuming you have a reference to the parent entity. If not, you can add the box to the root of the scene.
// If 'parentId' is the entity id of the parent in your project, you would need to find this entity first.
// For demonstration, adding the box to the application's root entity
this._app.root.addChild(box);

    // const box = new pc.Entity('cube');
    // box.addComponent('render', {
    //   type: 'box',
    // });

    
    // // var material = new pc.StandardMaterial();
    // // material.diffuse = new pc.Color(1, 0, 0);
    // // material.update();
    
    // // box.model.material = material;
    
    // box.setLocalScale(0.2, 0.2, 0.2);
    // box.setLocalPosition(0, 1, 0);
    // this._app.root.addChild(box);
    
    
    // box.addComponent('rigidbody', {
    //   type: 'dynamic',
    //   mass: 100
    // });
    
    // box.addComponent('collision', {
    //   type: 'box',
    //   halfExtents: new pc.Vec3(0.1, 0.1, 0.1)
    // });
    
    // box.collision.enabled = true;
    // box.rigidbody.applyForce(new pc.Vec3(0, -9.8, 0));

  }

   createCollisionVisuals(entity) {
    if (entity.collision && entity.collision.type === 'box') {
        // Create a new entity for the visual
        var visualEntity = new pc.Entity();
        visualEntity.addComponent('model', {
            type: 'box'
        });

        // Use a wireframe material
        var material = new pc.StandardMaterial();
        material.wireframe = true;
        material.update();

        visualEntity.model.model.meshInstances.forEach(function(meshInstance) {
            meshInstance.material = material;
        });

        // Match the size and position of the original collision component
        visualEntity.setLocalScale(entity.collision.halfExtents.x * 2, entity.collision.halfExtents.y * 2, entity.collision.halfExtents.z * 2);
        visualEntity.setLocalPosition(entity.getPosition());
        visualEntity.setLocalRotation(entity.getRotation());

        // Add the visual entity as a child of the original entity
        // This ensures that the visual moves and rotates with the entity
        entity.addChild(visualEntity);
    }
  }
}