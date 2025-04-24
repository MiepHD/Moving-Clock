class Alarm {
  minutes;
  hours;

  audio;
  hands;
  activeAlarm;
  alarms = {};

  previoushangle;
  previousminangle;

  constructor(hands, face) {
    this.minutes = new Minutes(
      face,
      document.getElementById('target-min'),
      this
    );
    this.hours = new Hours(face, document.getElementById('target-h'), this);
    this.minutes.addOtherHand(this.hours);
    this.hours.addOtherHand(this.minutes);

    this.audio = new Audio('assets/alarm.mp3');
    this.audio.loop = true;

    this.hands = hands;
    this.activeAlarm = this.getIdByDate(new Date());

    this.fillAlarms();

    //Show/hide alarm settings
    document.getElementById('eye').addEventListener('input', (e) => {
      if (e.target.checked) {
        this.setting = true;
        this.loadAlarm(document.forms['timeline']['edit'].value);
      } else {
        this.setting = false;
        this.loadAlarm(this.getIdByDate(new Date()));
      }
    });

    //Select alarm
    document
      .querySelectorAll('#timeline input[name="edit"]')
      .forEach((elem) => {
        elem.addEventListener('input', (e) => {
          this.loadAlarm(e.target.value);
        });
      });
  }

  fillAlarms() {
    document.querySelectorAll('#timeline .toggle').forEach((alarm) => {
      this.alarms[alarm.id] = {
        toggle: alarm,
        minutes: 0,
        hours: 0,
      };
    });
  }

  updateAlarm(time) {
    this.alarms[this.activeAlarm].toggle.style.setProperty(
      '--time',
      this.alarms[this.activeAlarm].hours
    );
    if (!(this.setting || this.minutes.getState() || this.hours.getState())) {
      //Updates alarm to alarm for current time
      this.minutes.setAngle(this.alarms[time].minutes);
      this.hours.setAngle(this.alarms[time].hours);
    }
  }

  saveAlarm() {
    this.alarms[this.activeAlarm].minutes = this.minutes.getAngle();
    this.alarms[this.activeAlarm].hours = this.hours.getAngle();
  }

  loadAlarm(id) {
    this.saveAlarm();
    this.minutes.setAngle(this.alarms[id].minutes);
    this.hours.setAngle(this.alarms[id].hours);

    this.activeAlarm = id;
  }

  alarm(time) {
    time = this.getIdByDate(time);
    this.updateAlarm(time);
    const currentminangle = this.hands.getMinutes(),
      currenthangle = this.hands.getHours();
    if (this.alarms[time]['toggle'].checked) {
      //Collect angles
      const alarmminangle = this.minutes.getAngle(),
        alarmhangle = this.hours.getAngle();

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

  getIdByDate(time) {
    return `${time.getHours() >= 12 ? 'PM' : 'AM'}${time.getDay()}`;
  }
}
