class Main {
  hands;
  face;
  alarm;
  //End of last tick
  lasttime;
  error;
  lastframerate;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('scroll', () => {
        window.scrollTo(0, 0);
      });

      this.hands = new Hands();
      this.lasttime = new Date();
      this.face = new Face(this.lasttime.getHours());
      this.alarm = new Alarm(this.hands, this.face);
      this.error = document.querySelector('body > span');
      this.lastframerate = 0;
      new Cursor();
      new Storage(this.alarm, this.face);

      this.syncTime();
    });
  }

  async syncTime() {
    const start = new Date();

    this.hands.setTime(start);
    this.face.rotate(start.getHours());
    this.alarm.update(start);

    const end = new Date();
    this.calculateFramerate(end);
    this.lasttime = end;
    setTimeout(
      this.syncTime.bind(this),
      20 - (end.getTime() - start.getTime())
    );
  }

  calculateFramerate(end) {
    const framerate = Math.round(
      1000 / (end.getTime() - this.lasttime.getTime())
    );
    if (framerate < 30) {
      this.error.textContent = `${framerate} FPS`;
    } else if (this.lastframerate < 30) {
      this.error.textContent = '';
    }
  }
}

new Main();
