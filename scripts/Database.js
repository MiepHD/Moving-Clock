class Database {
  db;
  objStore;
  constructor() {
    const request = window.indexedDB.open("clock", 1);
    rrquest.onsuccess = this.success;
    request.onerror = (e) => {
      this.error(e, "Couldn't open database");
    }
    request.onupgradeneeded = this.upgrade;
  }
  error(e, message){
    console.log(`${message}\nException:\n${e.target.error?.message}`);
  }
  success(e){
    this.db = e.target.result;
  }
  upgrade(e) {
    const db = e.target.result;
    const objStore = db.createObjectStore("audio", {autoIncrement:true});
    objStore.createIndex("name", "name", { unique: false });
    this.add({ "name": "Default", "file": new Audio("assets/alarm.mp3") });
  }
  
  remove(key) {
    const request = this.getObjStore().delete(key);
    request.onerror = (e) => {
      this.error(e, `Couldn't delete ${key}`);
    }
  }
  add(sound) {
    const request = this.getObjStore().add(sound);
    request.onerror = (e) => {
      this.error(e, `Couldn't add ${sound}`);
    }
  }
  getAudio(index) {
    const request = this.getObjStore().get(index);
    request.onsuccess = () => {
      return request.result.file;
    }
    request.onerror = (e) => {
      this.error(e, `Couldn't get file: ${index}`);
    }
  }
  getIndex() {
    const data = {};
    const request = this.getObjStore().openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if(cursor) {
        data.add({
          key: cursor.key,
          name: cursor.value.name
        });
        cursor.continue();
      } else {
        return data;
      }
    }
    request.onerror = (e) => {
      this.error(e, "Error at getting general data");
    }
  }
  
  getObjStore() {
    const transaction = this.db.transaction("audio", "readwrite");
    transaction.onerror = (e) => {
      this.error(e, "An error appeared somewhere in a transaction");
    }
    return transaction.objectStore("audio");
  }

}