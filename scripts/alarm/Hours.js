class Hours extends Hand {
  constructor(face, element, alarm) {
    super(face, element, alarm);
    face.hours.elem.addEventListener('input', () => {
      this.setAngle(document.forms['clock']['hour'].value);
      this.loadAlarm();
    });
  }
  updateOtherHand(angleHours) {
    this.otherhand.setAngle((angleHours % 30) * 12);
  }
}
