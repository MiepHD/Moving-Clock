class Hours extends Hand {
  constructor(face, element, alarm) {
    super(face, face.hours, document.forms['clock']['hour'], element, alarm);
  }
  updateOtherHand(angleHours) {
    this.otherhand.setAngle((angleHours % 30) * 12);
  }
}
