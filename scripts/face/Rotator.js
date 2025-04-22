class Rotator {
  //"min" or "h"
  id;
  //Rotationspeed between -0.3 and 0.3 degree/ms
  speed;
  //If this face should be rotating or be fixed on 270deg (no rotation)
  rotating;
  //Current rotation between 0 and 360 degree
  rotation;
  //Element of face
  elem;

  constructor(id) {
    this.id = id;
    this.speed = Math.random() * 0.06 - 0.03;
    this.rotating = true;
    this.rotation = 270;
    this.elem = document.getElementById('digits-' + this.id);

    //Speed slider handler
    document.getElementById('speed-slider-' + this.id).value =
      this.speed * 1000;
    document
      .getElementById('speed-slider-' + this.id)
      .addEventListener('input', this.setSpeed.bind(this));
    //Speed checkbox
    document
      .getElementById(this.id + '-moving')
      .addEventListener('input', (e) => {
        this.rotating = e.target.checked;
      });
  }

  updateRotation(ms) {
    if (this.rotating) {
      this.rotation = (this.rotation + this.speed * ms) % 360;
      this.elem.style.setProperty('--offset', this.rotation + 'deg');
    } else {
      this.elem.style.setProperty('--offset', '270deg');
    }
  }

  setSpeed(e) {
    this.speed = e.target.value / 1000;
  }
}
