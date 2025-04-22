class Hours extends Hand {
  constructor(face, element) {
    super(face, element);
    face.hours.elem.addEventListener('input', () => {
      this.setAngle(document.forms['clock']['hour'].value);
    });
  }
  updateOtherHand(angleHours) {
    this.otherhand.setAngle((angleHours % 30) * 12);
  }
}
