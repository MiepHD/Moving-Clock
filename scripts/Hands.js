class Hands {
  //Angles
  minutes;
  hours;

  mindigits;
  hdigits;
  minhand;
  hhand;

  constructor() {
    this.minutes = {
      digits: document.getElementById('digits-min'),
      hand: document.getElementById('minutes'),
      angle: 0,
    };
    this.hours = {
      digits: document.getElementById('digits-h'),
      hand: document.getElementById('hours'),
      angle: 0,
    };
  }

  //Takes an elem as hand
  setHand(hand) {
    hand.hand.style.transform =
      'rotate(' +
      //Add offset to rotate hand properly with face
      ((hand.angle +
        parseFloat(hand.digits.style.getPropertyValue('--offset'))) %
        360) +
      'deg)';
  }
  //Takes a Date as time input
  setTime(time) {
    const minutes = time.getMinutes(),
      seconds = time.getSeconds();

    this.minutes.angle =
      ((minutes * 60 + seconds + time.getMilliseconds() / 1000) / 10) % 360;
    this.setHand(this.minutes);

    this.hours.angle =
      ((time.getHours() * 60 + minutes + seconds / 60) / 2) % 360;
    this.setHand(this.hours);
  }

  getMinutes() {
    return this.minutes.angle;
  }
  getHours() {
    return this.hours.angle;
  }
}
