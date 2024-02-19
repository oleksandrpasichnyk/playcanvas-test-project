import * as pc from 'playcanvas';

export default class MaterialsHelper {
  static createMaterial(color) {
    const material = new pc.StandardMaterial();
    material.diffuse = color;
    material.update();
    
    return material;
  }
}