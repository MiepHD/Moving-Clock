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
    angleHours %= 360;
    if (angleHours > 0) angleHours -= 360;
    hourhand.style.setProperty('--rot', angleHours + 'deg');
    this.anglebefore = angleMinutes;
  }
}
