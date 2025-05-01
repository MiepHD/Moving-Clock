class Alarm {
  minutes;
  hours;

  audio;
  hands;
  activeAlarm;
  timeline;

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

    this.audio = new AudioHandler();

    this.hands = hands;
    this.timeline = new Timeline();

    //Show/hide timeline
    document.getElementById('edit').addEventListener('input', (e) => {
      if (e.target.checked) {
        this.switchTo(document.forms['timeline']['edit'].value);
        this.timeline.setting = true;
      } else {
        this.timeline.setting = false;
        this.switchTo(this.getIdByDate(new Date()));
      }
    });
    //Select alarm
    document
      .querySelectorAll('#timeline input[name="edit"]')
      .forEach((elem) => {
        elem.addEventListener('input', (e) => {
          this.switchTo(e.target.value);
        });
      });
  }

  switchTo(id) {
    if (id) {
      this.save();
      const angle = this.timeline.getAlarm(id);
      this.hours.setAngle(angle);
      this.hours.updateOtherHand(angle);

      this.activeAlarm = id;
    }
  }
  save() {
    this.timeline.setAlarm(this.activeAlarm, this.hours.getAngle());
  }

  update(time) {
    const visibility = this.timeline.isEnabled(this.activeAlarm);
    this.minutes.setVisibility(visibility);
    this.hours.setVisibility(visibility);
    time = this.getIdByDate(time);
    const currenthangle = this.hands.getHours();
    this.timeline.update(this.activeAlarm);
    if (!this.timeline.setting && this.activeAlarm != time) {
      //Updates alarm to alarm for current time
      this.switchTo(time);
    }
    if (visibility) {
      const alarmhangle = this.hours.getAngle();

      //Check if alarm should be activated
      if (this.previoushangle < alarmhangle && currenthangle >= alarmhangle)
        this.audio.play();
    }
    this.previoushangle = currenthangle;
  }

  getIdByDate(time) {
    return `${time.getHours() >= 12 ? 'PM' : 'AM'}${time.getDay()}`;
  }

  getAlarms() {
    return this.timeline.getAlarms();
  }
  setAlarms(alarms) {
    this.timeline.setAlarms(alarms);
    this.switchTo(this.activeAlarm);
  }
}
