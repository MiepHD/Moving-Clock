//Sets the rotation of the alarm hands depending on touch/cursor movement
class Hand {
  alarm;
  //Hand
  elem;
  //Clock's face
  face;
  myface;
  form;
  angle;
  //Middle of screen
  middle;
  middleelem;
  otherhand;
  state;

  constructor(face, myface, form, element, alarm) {
    this.alarm = alarm;
    this.elem = element;
    this.face = face;
    this.myface = myface;
    this.form = form;
    this.angle = 0;
    this.middleelem = document.getElementById('middle');
    this.updateMiddle();
    window.addEventListener('resize', this.updateMiddle.bind(this));

    this.update = this.update.bind(this);
    this.start = this.start.bind(this);
    this.save = this.save.bind(this);

    this.elem.addEventListener('mousedown', this.start);
    this.elem.addEventListener('touchstart', this.start);

    this.myface.elem.addEventListener('input', () => {
      const angle = this.form.value;
      this.setAngle(angle);
      this.updateOtherHand(angle);
      this.alarm.saveAlarm();
    });
  }

  //On touch start
  start() {
    this.state = true;
    this.face.toggleRotation();
    const options = { once: true };
    document.addEventListener('mouseup', this.save, options);
    document.addEventListener('touchend', this.save, options);

    document.addEventListener('mousemove', this.update);
    document.addEventListener('touchmove', this.update);
  }
  //On touch end
  save() {
    this.state = false;
    document.removeEventListener('mousemove', this.update);
    document.removeEventListener('touchmove', this.update);
    this.face.toggleRotation();
    this.alarm.saveAlarm();
  }

  updateMiddle() {
    this.middle = this.middleelem.getBoundingClientRect();
  }

  //On touch movement
  update(e) {
    //Only process first touch
    if (e.touches) e = e.touches[0];

    //Calculate angle
    const x = e.clientX - this.middle.x;
    const y = e.clientY - this.middle.y;
    let angle = Math.atan(y / x) * (180 / Math.PI);
    if (x < 0) angle += 180;
    angle -= parseFloat(
      this.elem.parentElement.style.getPropertyValue('--offset')
    );
    angle %= 360;
    if (angle < 0) angle += 360;
    this.setAngle(angle);
    this.updateOtherHand(this.angle);
  }

  getAngle() {
    return this.angle;
  }
  getState() {
    return this.state;
  }

  setAngle(angle) {
    document.dispatchEvent(new Event('input'));
    const formangle = Math.floor(angle);
    this.form.value =
      formangle % 30 == 0 ? formangle : formangle - (formangle % 30) + 1;

    this.elem.style.setProperty('--rot', angle + 'deg');
    this.angle = angle;
  }
  addOtherHand(hand) {
    this.otherhand = hand;
  }
}
