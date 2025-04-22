class Face {
  //FaceRotator of minutes
  minutes;
  //FaceRotator of hours
  hours;
  //Date of last tick
  lasttime;
  //If it should rotate or pause rotating
  rotating;
  //If speed should adopt to framerate (If framerate's lower than 50FPS the clock will get slower to move smoothly)
  dynamicspeed;

  constructor() {
    this.minutes = new Rotator('min');
    this.hours = new Rotator('h');
    this.lasttime = new Date();
    this.rotating = true;
    this.dynamicspeed = true;
  }

  rotate() {
    const time = new Date();
    if (this.rotating) {
      const ms = this.dynamicspeed
        ? 50
        : time.getTime() - this.lasttime.getTime();
      this.minutes.updateRotation(ms);
      this.hours.updateRotation(ms);
    }
    this.updateHours(time.getHours());
    this.lasttime = time;
  }
  /*
   * Switches hours between 0-11 and 12-23
   */
  updateHours(hour) {
    const lasthour = this.lasttime.getHours();
    if (!lasthour || hour != lasthour) {
      document.querySelector(`span.d${hour + 6}`).textContent = (hour + 6) % 24;
    }
  }

  setMinutesSpeed(speed) {
    this.hours.setMinutesSpeed(speed);
  }

  setHoursSpeed(speed) {
    this.hours.setHoursSpeed(speed);
  }

  toggleRotation() {
    this.rotating = !this.rotating;
  }
}
