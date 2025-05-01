class Timeline {
  setting;
  constructor() {
    this.setting = false;
    this.alarms = {};

    document.forms['timeline'].addEventListener('transitionend', (e) => {
      if (!this.setting) e.target.style.visibility = 'hidden';
    });
    document.forms['timeline'].addEventListener('transitionstart', (e) => {
      if (this.setting) e.target.style.visibility = 'visible';
    });
    this.fill();
  }
  fill() {
    document.querySelectorAll('#timeline .toggle').forEach((alarm) => {
      this.alarms[alarm.id] = {
        toggle: alarm,
        hours: 0,
      };
    });
  }

  update(time) {
    if (time)
      this.alarms[time].toggle.style.setProperty(
        '--time',
        this.alarms[time].hours
      );
  }

  setAlarms(alarms) {
    Object.keys(alarms).forEach((id) => {
      const alarm = alarms[id];
      this.alarms[id].hours = alarm.time;
      this.update(id);
      this.alarms[id].toggle.checked = alarm.active;
    });
  }
  setAlarm(time, angle) {
    if (this.setting) this.alarms[time].hours = angle;
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
  getAlarm(time) {
    return this.alarms[time].hours;
  }
  isEnabled(time) {
    return time ? this.alarms[time]['toggle'].checked : false;
  }
}
