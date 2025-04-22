class FaceRotator {
  id;
  speed;
  rotating;
  rotation;
  elem;
  constructor(id) {
    this.id = id;
    this.speed = Math.random() * 60 - 30;
    this.rotating = true;
    this.rotation = 270;
    this.elem = document.getElementById('digits-' + this.id);
    document.getElementById('speed-slider-' + this.id).value = this.speed;
    document
      .getElementById('speed-slider-' + this.id)
      .addEventListener('input', this.setSpeed.bind(this));
    document
      .getElementById(this.id + '-moving')
      .addEventListener('input', (e) => {
        this.rotating = e.target.checked;
      });
  }
  updateRotation(ms) {
    if (this.rotating) {
      this.rotation = (this.rotation + (this.speed * ms) / 2000) % 360;
      this.elem.style.setProperty('--offset', this.rotation + 'deg');
    } else {
      this.elem.style.setProperty('--offset', '270deg');
    }
  }
  setSpeed(e) {
    this.speed = e.target.value;
  }
}
