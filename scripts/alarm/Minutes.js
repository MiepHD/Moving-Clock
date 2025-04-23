class Minutes extends Hand {
  //Last angle in degree from 0 to 360
  anglebefore;
  constructor(face, element, loadAlarm) {
    super(face, element, loadAlarm);
    this.anglebefore = 0;
    face.minutes.elem.addEventListener('input', () => {
      this.setAngle(document.forms['clock']['minute'].value);
      this.loadAlarm(new Date());
    });
  }

  updateOtherHand(angleMinutes) {
    let angleHours = this.otherhand.getAngle();
    angleHours = angleHours - (angleHours % 30) + angleMinutes / 12;

    //Increase/Decrease hourhand
    if (this.anglebefore > 270 && angleMinutes < 90) angleHours += 30;
    if (angleMinutes > 270 && this.anglebefore < 90) angleHours -= 30;
    angleHours %= 360;
    if (angleHours < 0) angleHours += 360;
    this.otherhand.setAngle(angleHours);
    this.anglebefore = angleMinutes;
  }
}
