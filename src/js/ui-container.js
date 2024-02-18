import * as pc from 'playcanvas';

export default class MyUIElement extends pc.Entity {
    constructor(app, assets) {
        super();

        this._app = app;
        this._assets = assets;
        this.screen1 = null;
        this.screen2 = null;

        this._init();
    }

    _init() {
        // var jsonAsset = null;
        // fetch(jsonAsset.getFileUrl())
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //     });

        this.addComponent("screen", {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true
        });

        const button = new pc.Entity();
        button.addComponent("button");
        button.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5], // Center the button
            color: new pc.Color(1, 0, 0), // Red color
            height: 40,
            pivot: [0.5, 0.5],
            type: pc.ELEMENTTYPE_IMAGE,
            width: 175,
            useInput: true // Make the button interactive
        });

        // Add the button as a child of 'this' entity, which has the screen component
        this.addChild(button);

        console.log("this._app.assets", this._app.assets)
        // Create a label for the button
        const label = new pc.Entity();
        label.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5],
            color: new pc.Color(0, 0, 0),
            // fontName: "font", //this._app.assets.font.id,
            fontAsset: this._app.assets.find('Arial', 'font'),
            fontSize: 32,
            height: 64,
            pivot: [0.5, 0.5],
            text: "CLICK ME",
            type: pc.ELEMENTTYPE_TEXT,
            width: 128,
            wrapLines: true
        });
        button.addChild(label);
    }

    update(dt) {
        // Update logic for the screens if necessary
    }
}

// Register the component with the system