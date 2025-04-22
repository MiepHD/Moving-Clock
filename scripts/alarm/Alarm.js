class Alarm {
  previoushangle;
  previousminangle;
  minutes;
  hours;
  hands;
  audio;
  alarmam;
  alarmpm;
  constructor(hands, face) {
    this.minutes = new Minutes(face, document.getElementById('target-min'));
    this.hours = new Hours(face, document.getElementById('target-h'));
    this.minutes.addOtherHand(this.hours);
    this.hours.addOtherHand(this.minutes);

    this.audio = new Audio('assets/alarm.mp3');
    this.audio.loop = true;

    this.hands = hands;
    this.alarmam = document.getElementById('alarmam');
    this.alarmpm = document.getElementById('alarmpm');
  }
  alarm(hours) {
    //Collect angles
    const currentminangle = this.hands.getMinutes(),
      currenthangle = this.hands.getHours(),
      alarmminangle = this.minutes.getAngle(),
      alarmhangle = this.hours.getAngle();

    this.runTestOnAngles([
      currentminangle,
      currenthangle,
      alarmminangle,
      alarmhangle,
    ]);

    //Check if alarm should be activated
    if (
      this.previoushangle < alarmhangle + 15 &&
      currenthangle > alarmhangle - 15 &&
      this.previousminangle < alarmminangle &&
      currentminangle >= alarmminangle &&
      ((hours < 12 && this.alarmam.checked) ||
        (hours >= 12 && this.alarmpm.checked))
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

    this.previoushangle = currenthangle;
    this.previousminangle = currentminangle;
  }
  //Check if angles are valid
  runTestOnAngles(angles) {
    let error = false;
    for (const angle of angles) {
      if (angle < 0 || angle >= 360) {
        document.querySelector(
          'body > span'
        ).textContent = `Error: [CM:${Math.round(angles[0])},CH:${Math.round(
          angles[1]
        )},AM:${Math.round(angles[2])},AH:${Math.round(angles[3])}]`;
        error = true;
      }
    }
    if (!error) document.querySelector('body > span').textContent = '';
  }
}
