class Hands {
  minutes;
  hours;

  setHand(angle, hand) {
    if (Math.abs(angle) > 360) angle = angle % 360;
    if (angle < 0) angle += 360;
    document.getElementById(hand).style.transform = 'rotate(' + angle + 'deg)';
  }
  setTime(time) {
    const minutes = time.getMinutes(),
      seconds = time.getSeconds();

    this.minutes =
      ((minutes * 60 + seconds + time.getMilliseconds() / 1000) / 10) % 360;
    this.setHand(
      this.minutes +
        parseFloat(
          document
            .getElementById('digits-min')
            .style.getPropertyValue('--offset')
        ),
      'minutes'
    );

    this.hours = ((time.getHours() * 60 + minutes + seconds / 60) / 2) % 360;
    this.setHand(
      this.hours +
        parseFloat(
          document.getElementById('digits-h').style.getPropertyValue('--offset')
        ),
      'hours'
    );
  }

  getMinutes() {
    return this.minutes;
  }
  getHours() {
    return this.hours;
  }
}
