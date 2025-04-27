class Alarm {
  minutes;
  hours;

  audio;
  hands;
  activeAlarm;
  alarms = {};

  previoushangle;

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
    document.getElementById('edit').addEventListener('input', (e) => {
      if (e.target.checked) {
        this.setting = true;
        this.loadAlarm(document.forms['timeline']['edit'].value);
      } else {
        this.setting = false;
        this.loadAlarm(this.getIdByDate(new Date()));
      }
    });
    document.forms['timeline'].addEventListener('transitionend', (e) => {
      if (!this.setting) e.target.style.visibility = 'hidden';
    });
    document.forms['timeline'].addEventListener('transitionstart', (e) => {
      if (this.setting) e.target.style.visibility = 'visible';
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
      this.loadAlarm(time);
    }
  }

  saveAlarm() {
    this.alarms[this.activeAlarm].hours = this.hours.getAngle();
  }

  loadAlarm(id) {
    this.saveAlarm();
    const angle = this.alarms[id].hours;
    this.hours.setAngle(angle);
    this.hours.updateOtherHand(angle);

    this.activeAlarm = id;
  }

  alarm(time) {
    time = this.getIdByDate(time);
    this.updateAlarm(time);
    const currenthangle = this.hands.getHours();
    if (this.alarms[time]['toggle'].checked) {
      //Collect angles
      const alarmhangle = this.hours.getAngle();

      //Check if alarm should be activated
      if (this.previoushangle < alarmhangle && currenthangle >= alarmhangle) {
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
  }

  getIdByDate(time) {
    return `${time.getHours() >= 12 ? 'PM' : 'AM'}${time.getDay()}`;
  }
}
