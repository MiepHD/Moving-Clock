class Hands {
  //Angle in degree from 0 to 360 of minutes hand
  minutes;
  //Angle in degree from 0 to 360 of hours hand
  hours;

  //Takes "min" or "h" as hand input
  setHand(angle, hand) {
    if (Math.abs(angle) > 360) angle = angle % 360;
    if (angle < 0) angle += 360;
    document.getElementById(hand).style.transform = 'rotate(' + angle + 'deg)';
  }
  //Takes a Date as time input
  setTime(time) {
    const minutes = time.getMinutes(),
      seconds = time.getSeconds();

    this.minutes =
      ((minutes * 60 + seconds + time.getMilliseconds() / 1000) / 10) % 360;
    this.setHand(
      this.minutes +
        //Add offset to rotate hand properly with face
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
        //Add offset to rotate hand properly with face
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
