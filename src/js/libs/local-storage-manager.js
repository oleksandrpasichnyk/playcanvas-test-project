export default class LocalStorageManager {
  static set(key, value) {
      try {
          const valueToStore = JSON.stringify(value);
          window.localStorage.setItem(key, valueToStore);
      } catch (error) {
          console.error("Error saving to LocalStorage", error);
      }
  }

  static get(key) {
      try {
          const value = window.localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
      } catch (error) {
          console.error("Error retrieving from LocalStorage", error);
          return null;
      }
  }

  static remove(key) {
      try {
          window.localStorage.removeItem(key);
      } catch (error) {
          console.error("Error removing item from LocalStorage", error);
      }
  }

  static clear() {
      try {
          window.localStorage.clear();
      } catch (error) {
          console.error("Error clearing LocalStorage", error);
      }
  }

  static update(key, value) {
    if (window.localStorage.getItem(key) !== null) {
        try {
            const valueToUpdate = JSON.stringify(value);
            window.localStorage.setItem(key, valueToUpdate);
        } catch (error) {
            console.error("Error updating item in LocalStorage", error);
        }
    } else {
        console.warn(`Item with key '${key}' does not exist. Consider using setItem to create it.`);
    }
}

  static exists(key) {
    return window.localStorage.getItem(key) !== null;
  }
}
