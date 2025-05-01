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
        audio: this.alarm.audio.getCurrentAudio(),
      })
    );
  }
  loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
      if (settings.alarms) this.alarm.setAlarms(settings.alarms);
      if (settings.hours.rotating)
        this.face.hours.setRotating(settings.hours.rotating);
      if (settings.hours.speed) this.face.hours.setSpeed(settings.hours.speed);
      if (settings.minutes.rotating)
        this.face.minutes.setRotating(settings.minutes.rotating);
      if (settings.minutes.speed)
        this.face.minutes.setSpeed(settings.minutes.speed);
      if (settings.audio) this.alarm.audio.setAudioById(settings.audio);
    }
  }
}
