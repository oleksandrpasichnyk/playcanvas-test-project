export default class AssetsHelper {
  constructor() {
    console.log('constructor')
    throw new Error('Use AssetsHelper.registerApp() and AssetsHelper.getAssetByName()');
  }
  
  static _app = null;

  static registerApp(app) {
    console.log('registerApp')
    this._app = app;
  }

  static getAssetByName(name, type) {
    if (!this._app) {
      throw new Error('App is not registered. Please call AssetsHelper.registerApp(app) before using this method.');
    }
    return this._app.assets.find(name, type) || null;
  }
}