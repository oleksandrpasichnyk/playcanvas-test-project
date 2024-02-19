import * as pc from 'playcanvas';
import IconButton from './ui/elements/icon-button.js';

export default class MyUIElement extends pc.Entity {
    constructor(app, assets) {
        super();

        this._app = app;
        this._assets = assets;
        this.screen1 = null;
        this.screen2 = null;

        // this._init();
    }

    _init() {
        this.addComponent("screen", {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true
        });

        const settingsBtn = this._settingsBtn = new IconButton('settings.png');
        this.addChild(settingsBtn);
        // settingsBtn.element.anchor.set(0.1, 0.9, 0, 1); // Anchors to the top-left corner

        window.addEventListener('resize', () => {
            settingsBtn.localPosition.x = 0;
            settingsBtn.localPosition.y = this._app.graphicsDevice.height * 0.5; // Top of the screen
            // settingsBtn.setAnchor(pc.ANCHOR_TOP_LEFT);
            // settingsBtn.element.anchor.set(0.1, 1, 0, 1); // Anchors to the top-left corner
        });

        // settingsBtn.element.anchor.set(0.1, 0.9, 0, 1); // Anchors to the top-left corner
        // settingsBtn.element.pivot.set(0, 0.5); // Pivot at the top-left of the element

        // settingsBtn.setPosition(0, 0);

        // const appWidth = this._app.graphicsDevice.width;
        // const appHeight = this._app.graphicsDevice.width;

        // settingsBtn.setLocalPosition(0, 0);
    }

    update(dt) {
        // Update logic for the screens if necessary
    }
}

// Register the component with the system