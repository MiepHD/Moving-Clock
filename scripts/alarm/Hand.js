//Sets the rotation of the alarm hands depending on touch/cursor movement
class Hand {
  loadAlarm;
  //Hand
  elem;
  //Current angle in degree from 0 to 360
  angle;
  //Clock's face
  face;
  otherhand;
  //Middle of screen
  middle;
  state;

  constructor(face, element, loadAlarm) {
    this.loadAlarm = loadAlarm;
    this.elem = element;
    this.face = face;
    this.angle = 0;
    this.middle = document.getElementById('middle').getBoundingClientRect();

    this.update = this.update.bind(this);
    this.start = this.start.bind(this);
    this.save = this.save.bind(this);

    this.elem.addEventListener('mousedown', this.start);
    this.elem.addEventListener('touchstart', this.start);
  }

  //On touch start
  start() {
    this.state = true;
    this.face.toggleRotation();
    document.addEventListener('mouseup', this.save, {
      once: true,
    });
    document.addEventListener('touchend', this.save, {
      once: true,
    });

    document.addEventListener('mousemove', this.update);
    document.addEventListener('touchmove', this.update);
  }
  //On touch end
  save() {
    this.state = false;
    document.removeEventListener('mousemove', this.update);
    document.removeEventListener('touchmove', this.update);
    this.face.toggleRotation();
    this.loadAlarm(new Date());
  }
  //On touch movement
  update(e) {
    //Only process first touch
    if (e.touches) e = e.touches[0];

    //Calculate angle
    const x = e.clientX - this.middle.x;
    const y = e.clientY - this.middle.y;
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
  getState() {
    return this.state;
  }

  setAngle(angle) {
    if (angle != undefined && angle >= 0 && angle <= 360) {
      this.elem.style.setProperty('--rot', angle + 'deg');
      this.angle = angle;
    }
  }
  addOtherHand(hand) {
    this.otherhand = hand;
  }
}
