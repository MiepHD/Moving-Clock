/*
 * Sets the rotation of the alarm hands depending on touch/cursor movement
 */

class Rotator {
  elem;
  /*
   * In degree from 0 to 360
   */
  anglebefore;
  /*
   * In degree from 0 to 360
   */
  angle;
  face;
  otherhand;
  constructor(face, element) {
    this.anglebefore = 0;
    this.elem = element;
    this.face = face;
    this.angle = 0;
    this.elem.addEventListener('mousedown', this.start.bind(this));
    this.elem.addEventListener('touchstart', this.start.bind(this));
  }
  start() {
    this.face.toggleRotation();
    document.addEventListener('mouseup', this.save.bind(this), {
      once: true,
    });
    document.addEventListener('touchend', this.save.bind(this), {
      once: true,
    });
    this.update = this.update.bind(this);
    document.addEventListener('mousemove', this.update);
    document.addEventListener('touchmove', this.update);
  }
  save() {
    document.removeEventListener('mousemove', this.update);
    document.removeEventListener('touchmove', this.update);
    this.face.toggleRotation();
  }
  update(e) {
    if (e.touches) e = e.touches[0];
    const middle = document.getElementById('middle').getBoundingClientRect();
    const x = e.clientX - middle.x;
    const y = e.clientY - middle.y;
    let angle = Math.atan(y / x) * (180 / Math.PI);
    if (x < 0) angle = angle + 180;
    angle =
      angle -
      parseFloat(this.elem.parentElement.style.getPropertyValue('--offset'));
    if (angle < 0) angle = 360 + angle;
    this.setAngle(angle % 360);
    this.updateOtherHand(this.angle);
  }

  getAngle() {
    return this.angle;
  }

  setAngle(angle) {
    if (angle && angle >= 0 && angle <= 360) {
      this.elem.style.setProperty('--rot', this.angle + 'deg');
      this.angle = angle;
    }
  }

  addOtherHand(hand) {
    this.otherhand = hand;
  }
}
