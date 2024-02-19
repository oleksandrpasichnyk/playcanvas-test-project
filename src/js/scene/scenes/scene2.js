import * as pc from "playcanvas";
import AssetsHelper from "../../libs/assets-helper.js";
import SceneAbstract from "./scene-abstract.js";

export default class Scene2 extends SceneAbstract {
  constructor() {
    super();

    this._init();
  }

  _init() {
    const colors = [
      new pc.Color(191 / 256, 219 / 256, 242 / 256),
      new pc.Color(111 / 256, 216 / 256, 216 / 256),
      new pc.Color(28 / 256, 103 / 256, 114 / 256),
    ];

    const entity = new pc.Entity("Sparks");
    this.addChild(entity);
    entity.setLocalPosition(0, 0, 0);

    for (const color of colors) {
      this._createParticleSystem(entity, color);
    }
  }

  _createParticleSystem(entity, startColor) {
    let particleSystem = entity.clone();
    this.addChild(particleSystem);

    const localVelocityCurve = new pc.CurveSet([
      [0, 0, 0.1, 0.25, 0.4, 0.65, 1, 0.4],
      [0, 0, 0.1, 0.25, 0.4, 0.65, 1, 0.4],
      [0, 0, 1, 0],
    ]);

    const localVelocityCurve2 = new pc.CurveSet([
      [0, 0, 0.1, -0.25, 0.4, -0.65, 1, -0.4],
      [0, 0, 0.1, -0.25, 0.4, -0.65, 1, -0.4],
      [0, 0, 1, 0],
    ]);

    const scaleCurve = new pc.Curve([0, 0, 0.15, 0.02, 0.5, 0.03, 1, 0]);

    const alphaCurve = new pc.Curve([0, 1, 0.7, 0.6, 1, 0]);

    const { r, g, b } = startColor;

    const colorCurve = new pc.CurveSet([
      [0, r, 0.4, r, 1, 1],
      [0, g, 0.4, g, 1, 1],
      [0, b, 0.4, b, 1, 1],
    ]);

    const image = AssetsHelper.getAssetByName("particle", "texture");
    const image2 = AssetsHelper.getAssetByName("bg", "texture");

    particleSystem.addComponent("particlesystem", {
      numParticles: 200,
      lifetime: 3.5,
      rate: 0.04,
      scaleGraph: scaleCurve,
      colorGraph: colorCurve,
      colorMap: image.resource,
      colorMap2: image2.resource,
      alphaGraph: alphaCurve,

      animTilesX: 2,
      animTilesY: 2,
      animNumFrames: 4,
      randomizeAnimIndex: false,
      animSpeed: 1,

      localVelocityGraph: localVelocityCurve,
      localVelocityGraph2: localVelocityCurve2,
    });
  }
}
