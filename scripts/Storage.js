class Storage {
  alarm;
  face;
  constructor(alarm, face) {
    this.alarm = alarm;
    this.face = face;
    this.loadSettings();
    document.addEventListener('input', this.saveSettings.bind(this));
  }
  saveSettings() {
    localStorage.setItem(
      'settings',
      JSON.stringify({
        alarms: this.alarm.getAlarms(),
        hours: {
          rotating: this.face.hours.rotating,
          speed: this.face.hours.speed,
        },
        minutes: {
          rotating: this.face.minutes.rotating,
          speed: this.face.minutes.speed,
        },
      })
    );
  }
  loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
      this.face.hours.setRotating(settings.hours.rotating);
      this.face.hours.setSpeed(settings.hours.speed);
      this.face.minutes.setRotating(settings.minutes.rotating);
      this.face.minutes.setSpeed(settings.minutes.speed);
      this.alarm.setAlarms(settings.alarms);
    }
  }
}
