class AudioHandler {
  form;
  db;
  fieldset;
  initId;
  constructor() {
    this.form = document.forms['options'];
    this.initId = 1;
    this.db = new Database();
    this.db.onsuccess = this.generateAudioOptions.bind(this);
  }
  async generateAudioOptions() {
    const div = document.createElement('div');
    const add = document.createElement('input');
    add.type = 'file';
    add.accept = 'audio/*';
    add.id = 'add-audio';
    add.addEventListener('change', this.updateList.bind(this));
    const label = document.createElement('label');
    label.setAttribute('for', 'add-audio');
    label.textContent = '+';
    div.appendChild(add);
    div.appendChild(label);
    this.form.appendChild(div);
    this.loadFieldset();
  }
  updateList(e) {
    const file = e.target.files[0];
    if (file) {
      const matches = file.name.match(/.*(?=\.)/);
      const name = matches[0] ? matches[0] : file.name;
      this.db.add({ name: name, file: file });
      this.loadFieldset();
    }
  }
  loadFieldset() {
    this.db.getIndex().then((index) => {
      this.fieldset?.remove();
      const fieldset = document.createElement('fieldset');
      this.fieldset = fieldset;
      for (const i of index) {
        const option = document.createElement('input');
        option.value = i.key;
        option.type = 'radio';
        option.name = 'audio';
        option.id = `a${i.key}`;
        const label = document.createElement('label');
        label.setAttribute('for', `a${i.key}`);
        label.textContent = i.name;
        const button = document.createElement('button');
        button.ariaLabel = 'Remove this element';
        button.textContent = 'X';
        button.type = 'button';
        button.setAttribute('data-id', i.key);
        button.addEventListener('click', (e) => {
          e.target.parentElement.remove();
          this.db.remove(parseInt(e.target.getAttribute('data-id')));
        });
        const div = document.createElement('div');
        div.appendChild(option);
        div.appendChild(label);
        div.appendChild(button);
        fieldset.appendChild(div);
      }
      this.form.insertBefore(fieldset, this.form.lastChild);
      if (index.length > 1) this.form['audio'].value = this.initId;
    });
  }
  async getAudio() {
    const id = parseInt(this.form['audio'].value);
    const audio = await this.db.getAudio(id ? id : 1);
    audio.loop = true;
    return audio;
  }
  getCurrentAudio() {
    return this.form.audio ? this.form.audio.value : 1;
  }
  setAudioById(id) {
    this.initId = id;
  }
  async play() {
    const audio = await this.getAudio();
    audio.play();
    document.addEventListener(
      'touchstart',
      () => {
        audio.pause();
      },
      { once: true }
    );
    document.addEventListener(
      'click',
      () => {
        audio.pause();
      },
      { once: true }
    );
  }
}
