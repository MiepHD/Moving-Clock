class Alarm {
  previoushangle;
  previousminangle;
  minutes;
  hours;
  hands;
  audio;
  alarms = {};
  activeAlarm;
  constructor(hands, face) {
    this.loadAlarm = this.loadAlarm.bind(this);
    this.minutes = new Minutes(
      face,
      document.getElementById('target-min'),
      this.loadAlarm
    );
    this.hours = new Hours(
      face,
      document.getElementById('target-h'),
      this.loadAlarm
    );
    this.minutes.addOtherHand(this.hours);
    this.hours.addOtherHand(this.minutes);

    this.audio = new Audio('assets/alarm.mp3');
    this.audio.loop = true;

    this.hands = hands;
    this.activeAlarm = this.getAlarmByTime(new Date());

    for (const alarm of document.querySelectorAll('#timeline .toggle')) {
      this.alarms[alarm.id] = {
        toggle: alarm,
        minutes: 0,
        hours: 0,
      };
    }

    document.getElementById('eye').addEventListener('input', (e) => {
      let id;
      if (e.target.checked) {
        this.setting = true;
        id = document.forms['timeline']['edit'].value;
      } else {
        id = this.getAlarmByTime(new Date());
        this.setting = false;
      }
      this.loadAlarm(id);
    });
    document.querySelectorAll('#timeline .edit').forEach((elem) => {
      elem.addEventListener('input', (e) => {
        this.loadAlarm(e.target.value);
      });
    });
  }

  isSetting() {
    return this.setting || this.minutes.getState() || this.hours.getState();
  }

  updateAlarm(time) {
    this.alarms[this.activeAlarm].toggle.style.setProperty(
      '--time',
      this.alarms[this.activeAlarm].hours
    );
    if (!this.isSetting()) {
      //Updates alarm to alarm for current time
      this.minutes.setAngle(this.alarms[time].minutes);
      this.hours.setAngle(this.alarms[time].hours);
    }
  }

  loadAlarm(id) {
    this.alarms[this.activeAlarm].minutes = this.minutes.getAngle();
    this.alarms[this.activeAlarm].hours = this.hours.getAngle();
    //Save last alarm
    this.minutes.setAngle(this.alarms[id].minutes);
    this.hours.setAngle(this.alarms[id].hours);

    this.activeAlarm = id;
  }

  alarm(time) {
    time = this.getAlarmByTime(time);
    this.updateAlarm(time);
    const currentminangle = this.hands.getMinutes(),
      currenthangle = this.hands.getHours();
    if (this.isAlarmActive(time)) {
      //Collect angles
      const alarmminangle = this.minutes.getAngle(),
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
        currentminangle >= alarmminangle
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

  isAlarmActive(time) {
    return this.alarms[time]['toggle'].checked;
  }
  getAlarmByTime(time) {
    return `${time.getHours() >= 12 ? 'PM' : 'AM'}${time.getDay()}`;
  }
}
