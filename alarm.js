document.addEventListener('DOMContentLoaded', () => {
  new Hours(document.getElementById('target-h'));
  new Minutes(document.getElementById('target-min'));
});
class Rotator {
  constructor(element) {
    this.anglebefore = 0;
    this.elem = element;
    this.elem.addEventListener('mousedown', this.start.bind(this));
    this.elem.addEventListener('touchstart', this.start.bind(this));
  }
  start() {
    this.minutesspeed = minutesspeed;
    this.hoursspeed = hoursspeed;
    minutesspeed = 0;
    hoursspeed = 0;
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
    minutesspeed = this.minutesspeed;
    hoursspeed = this.hoursspeed;
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
    this.elem.style.setProperty('--rot', angle + 'deg');
    this.updateOtherHand(angle);
  }
}
class Minutes extends Rotator {
  updateOtherHand(angleMinutes) {
    angleMinutes %= 360;
    if (angleMinutes < 0) angleMinutes += 360;
    const hourhand = document.getElementById('target-h');
    let angleHours = parseFloat(hourhand.style.getPropertyValue('--rot'));
    if (!angleHours) angleHours = 30;
    angleHours = angleHours - (angleHours % 30) - 30 + angleMinutes / 12;
    if (this.anglebefore > 270 && angleMinutes < 90) {
      angleHours += 30;
    }
    if (angleMinutes > 270 && this.anglebefore < 90) angleHours -= 30;
    console.log(angleHours);
    angleHours %= 360;
    if (angleHours > 0) angleHours -= 360;
    hourhand.style.setProperty('--rot', angleHours + 'deg');
    this.anglebefore = angleMinutes;
  }
}
class Hours extends Rotator {
  updateOtherHand(angleHours) {
    const angleMinutes = (angleHours % 30) * 12;
    document
      .getElementById('target-min')
      .style.setProperty('--rot', angleMinutes + 'deg');
  }
}
