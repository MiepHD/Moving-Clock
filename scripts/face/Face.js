class Face {
  minutes;
  hours;
  lasthour;
  rotating;

  constructor() {
    this.minutes = new FaceRotator('min');
    this.hours = new FaceRotator('h');
    this.rotating = true;
  }

  rotate(hours) {
    if (this.rotating) {
      this.minutes.updateRotation();
      this.hours.updateRotation();
    }
    this.updateHours(hours);
  }
  /*
   * Switches hours switch between 0-11 and 12-23
   */
  updateHours(hour) {
    if (!this.lasthour || hour != this.lasthour) {
      this.lasthour = hour;
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
