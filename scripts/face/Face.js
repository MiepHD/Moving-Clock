class Face {
  //FaceRotator of minutes
  minutes;
  //FaceRotator of hours
  hours;
  //If it should rotate or pause rotating
  rotating;

  constructor(hours) {
    this.minutes = new Rotator('min');
    this.hours = new Rotator('h');
    this.rotating = true;

    for (let i = 0; i <= 12; i++) {
      this.updateHours(hours - i);
    }
  }

  rotate(hour) {
    if (this.rotating) {
      this.minutes.updateRotation();
      this.hours.updateRotation();
    }
    this.updateHours(hour);
  }
  /*
   * Switches hours between 0-11 and 12-23
   */
  updateHours(hour) {
    if (hour != this.lasthour) {
      let hourToUpdate = (hour + 6) % 24;
      if (hourToUpdate < 0) hourToUpdate += 24;
      document.querySelector(`.d${hourToUpdate}`).textContent = hourToUpdate;
    }
    this.lasthour = hour;
  }

  toggleRotation() {
    this.rotating = !this.rotating;
  }
}
