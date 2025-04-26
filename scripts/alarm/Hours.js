class Hours extends Hand {
  constructor(face, element, alarm) {
    super(face, element, alarm);
    face.hours.elem.addEventListener('input', () => {
      const angle = document.forms['clock']['hour'].value;
      this.setAngle(angle);
      this.updateOtherHand(angle);
      this.alarm.saveAlarm();
    });
  }
  updateOtherHand(angleHours) {
    this.otherhand.setAngle((angleHours % 30) * 12);
  }
}
