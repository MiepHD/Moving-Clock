class Database {
  db;
  objStore;
  onsuccess;
  constructor() {
    const request = window.indexedDB.open('clock', 1);
    request.onerror = (e) => {
      this.error(e, "Couldn't open database");
    };
    request.onupgradeneeded = this.upgrade.bind(this);
    request.onsuccess = this.success.bind(this);
  }
  error(e, message) {
    console.log(`${message}\nException:\n${e.target.error?.message}`);
  }
  async success(e) {
    this.db = e.target.result;
    if ((await this.getIndex()).length == 0) {
      await this.addDefault();
    }

    this.onsuccess();
  }

  async addDefault() {
    const file = await fetch('assets/alarm.mp3');
    this.add({ name: 'Default', file: await file.blob() });
  }

  upgrade(e) {
    const db = e.target.result;
    db.createObjectStore('audio', { autoIncrement: true });
  }

  remove(key) {
    const request = this.getObjStore().delete(key);
    request.onerror = (e) => {
      this.error(e, `Couldn't delete ${key}`);
    };
  }
  add(sound) {
    const request = this.getObjStore().add(sound);
    request.onsuccess = () => {
      console.log(`Added ${sound.name}`);
    };
  }
  getAudio(index) {
    return new Promise((resolve) => {
      const request = this.getObjStore().get(index);
      request.onsuccess = () => {
        if (request.result?.file) {
          const audio = new Audio(URL.createObjectURL(request.result.file));
          resolve(audio);
        } else {
          resolve(null);
        }
      };
      request.onerror = (e) => {
        this.error(e, `Couldn't get file: ${index}`);
        resolve(null);
      };
    });
  }
  getIndex() {
    return new Promise((resolve) => {
      const data = [];
      const request = this.getObjStore().openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          data.push({
            key: cursor.key,
            name: cursor.value.name,
          });
          cursor.continue();
        } else {
          resolve(data);
        }
      };
      request.onerror = (e) => {
        this.error(e, 'Error at getting general data');
        resolve(data);
      };
    });
  }

  getObjStore() {
    const transaction = this.db.transaction('audio', 'readwrite');
    transaction.onerror = (e) => {
      this.error(e, 'An error appeared somewhere in a transaction');
    };
    return transaction.objectStore('audio');
  }
}
