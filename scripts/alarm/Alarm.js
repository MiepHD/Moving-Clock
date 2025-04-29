class Alarm {
  minutes;
  hours;
  setting;

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
    this.setting = false;

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

  updateTimeline(time) {
    this.alarms[time].toggle.style.setProperty(
      '--time',
      this.alarms[time].hours
    );
  }
  updateAlarm(time) {
    this.updateTimeline(this.activeAlarm);
    if (!(this.setting || this.minutes.getState() || this.hours.getState())) {
      //Updates alarm to alarm for current time
      this.loadAlarm(time);
    }
  }

  saveAlarm() {
    this.alarms[this.activeAlarm].hours = this.hours.getAngle();
  }

  loadAlarm(id, nosave) {
    if (!nosave) this.saveAlarm();
    const angle = this.alarms[id].hours;
    this.hours.setAngle(angle);
    this.hours.updateOtherHand(angle);

    this.activeAlarm = id;
  }

  alarm(time) {
    const visibility = this.alarms[this.activeAlarm]['toggle'].checked;
    this.minutes.setVisibility(visibility);
    this.hours.setVisibility(visibility);
    time = this.getIdByDate(time);
    const currenthangle = this.hands.getHours();
    this.updateAlarm(time);
    if (visibility) {
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
  getAlarms() {
    const data = {};
    for (const id in this.alarms) {
      const alarm = this.alarms[id];
      data[id] = {
        time: alarm.hours,
        active: alarm.toggle.checked,
      };
    }
    return data;
  }
  setAlarms(alarms) {
    Object.keys(alarms).forEach((id) => {
      const alarm = alarms[id];
      this.alarms[id].hours = alarm.time;
      this.updateTimeline(id);
      this.alarms[id].toggle.checked = alarm.active;
    });
    this.loadAlarm(this.activeAlarm, true);
  }
}
