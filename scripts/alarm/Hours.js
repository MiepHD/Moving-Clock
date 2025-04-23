class Hours extends Hand {
  constructor(face, element, loadAlarm) {
    super(face, element, loadAlarm);
    face.hours.elem.addEventListener('input', () => {
      this.setAngle(document.forms['clock']['hour'].value);
      this.loadAlarm(new Date());
    });
  }
  updateOtherHand(angleHours) {
    this.otherhand.setAngle((angleHours % 30) * 12);
  }
}
