import * as pc from 'playcanvas';

export default class Loader {
  constructor(app) {

    this._app = app;

    this._loadFonts();
    this._loadImages();
  }

  _loadFonts() {
    const app = this._app;

    const fontAsset = new pc.Asset('Arial', 'font', { url: 'fonts/arial.json' });
    app.assets.add(fontAsset);
    app.assets.load(fontAsset);
  }

  _loadImages() {
    const app = this._app;

    const atlasTextureAsset = new pc.Asset('atlasTexture', 'texture', { url: 'atlas/atlas.png' });
    const atlasDataAsset = new pc.Asset('atlasData', 'json', { url: 'atlas/atlas.json' });

    app.assets.add(atlasTextureAsset);
    app.assets.add(atlasDataAsset);
    app.assets.load(atlasTextureAsset);
    app.assets.load(atlasDataAsset);

    atlasTextureAsset.ready(() => {
      atlasDataAsset.ready(() => {
        // this.createIconFromAtlas(atlasTextureAsset, atlasDataAsset);
      });
    });
  }


  createIconFromAtlas(textureAsset, dataAsset) {
    const app = this._app; // Reference to your app instance

    const frames = dataAsset.resource.frames; // Get the frames from the JSON data
    console.log(frames)
    const iconFrame = frames['diamond.png']; // Assuming 'icon.png' is the frame name

    if (!iconFrame) {
      console.error('Icon frame not found in atlas');
      return;
    }

    const screen = new pc.Entity();
      screen.addComponent("screen", {
        referenceResolution: new pc.Vec2(1280, 720),
        scaleBlend: 0.5,
        scaleMode: pc.SCALEMODE_BLEND,
        screenSpace: true
      });
      app.root.addChild(screen);

    // Create an entity with an element component to display the icon
    const iconEntity = new pc.Entity('Icon');
    iconEntity.addComponent('element', {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: iconFrame.frame.w,
      height: iconFrame.frame.h,
      textureAsset: textureAsset,
      rect: [
        iconFrame.frame.x / textureAsset.resource.width,
        iconFrame.frame.y / textureAsset.resource.height,
        iconFrame.frame.w / textureAsset.resource.width,
        iconFrame.frame.h / textureAsset.resource.height
      ]
    });

    // Add the entity to the hierarchy
    screen.addChild(iconEntity);
  }

}