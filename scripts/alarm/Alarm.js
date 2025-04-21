class Alarm {
  previoushangle;
  previousminangle;
  minutes;
  hours;
  constructor(hands, face) {
    this.minutes = new Minutes(face, document.getElementById('target-min'));
    this.hours = new Hours(face, document.getElementById('target-h'));
    this.hands = hands;
  }
  alarm(hours) {
    const currentminangle = this.hands.getMinutes(),
      currenthangle = this.hands.getHours(),
      alarmminangle = this.minutes.getAngle(),
      alarmhangle = this.hours.getAngle();
    for (const angle of [
      currentminangle,
      currenthangle,
      alarmminangle,
      alarmhangle,
    ]) {
      if (angle < 0 || angle >= 360)
        document.querySelector('body > span').style.visibility = 'visible';
    }
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
        const alarm = setInterval(() => {
          new Audio('assets/alarm.mp3').play();
        }, 4000);
        document.addEventListener(
          'touchstart',
          () => {
            clearInterval(alarm);
          },
          { once: true }
        );
        document.addEventListener(
          'click',
          () => {
            clearInterval(alarm);
          },
          { once: true }
        );
      }
    }
    this.previoushangle = currenthangle;
    this.previousminangle = currentminangle;
  }
}
