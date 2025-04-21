class Alarm {
  previoushangle;
  previousminangle;
  minutes;
  hours;
  audio;
  constructor(hands, face) {
    this.minutes = new Minutes(face, document.getElementById('target-min'));
    this.hours = new Hours(face, document.getElementById('target-h'));
    this.minutes.addOtherHand(this.hours);
    this.hours.addOtherHand(this.minutes);
    this.hands = hands;
    this.audio = new Audio('assets/alarm.mp3');
    this.audio.loop = true;
  }
  alarm(hours) {
    const currentminangle = this.hands.getMinutes(),
      currenthangle = this.hands.getHours(),
      alarmminangle = this.minutes.getAngle(),
      alarmhangle = this.hours.getAngle();
    let error = false;
    for (const angle of [
      currentminangle,
      currenthangle,
      alarmminangle,
      alarmhangle,
    ]) {
      if (angle < 0 || angle >= 360) {
        document.querySelector(
          'body > span'
        ).textContent = `Error: [CM:${Math.round(
          currentminangle
        )},CH:${Math.round(currenthangle)},AM:${Math.round(
          alarmminangle
        )},AH:${Math.round(alarmhangle)}]`;
        error = true;
      }
    }
    if (!error) document.querySelector('body > span').textContent = '';
    if (
      this.previoushangle < alarmhangle + 15 &&
      currenthangle > alarmhangle - 15 &&
      this.previousminangle < alarmminangle &&
      currentminangle >= alarmminangle
    ) {
      if (
        (hours < 12 && document.getElementById('alarmam').checked) ||
        (hours >= 12 && document.getElementById('alarmpm').checked)
      ) {
        this.audio.play();
        document.addEventListener(
          'touchstart',
          () => {
            this.audio.pause();
          },
          { once: true }
        );
        document.addEventListener(
          'click',
          () => {
            this.audio.pause();
          },
          { once: true }
        );
      }
    }
    this.previoushangle = currenthangle;
    this.previousminangle = currentminangle;
  }
}
