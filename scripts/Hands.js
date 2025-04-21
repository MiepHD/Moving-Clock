class Hands {
  minutes;
  hours;
  setHand(angle, hand) {
    if (angle > 360) angle = angle % 360;
    document.getElementById(hand).style.transform = 'rotate(' + angle + 'deg)';
  }
  setTime(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    this.minutes = ((minutes * 60 + seconds + milliseconds / 1000) / 10) % 360;
    this.setHand(
      this.minutes +
        parseFloat(
          document
            .getElementById('digits-min')
            .style.getPropertyValue('--offset')
        ),
      'minutes'
    );

    this.hours = ((hours * 60 + minutes + seconds / 60) / 2) % 360;
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
