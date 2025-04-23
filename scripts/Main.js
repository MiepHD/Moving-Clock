class Main {
  hands;
  face;
  alarm;
  //End of last tick
  lasttime;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.hands = new Hands();
      this.lasttime = new Date();
      this.face = new Face(this.lasttime.getHours());
      this.alarm = new Alarm(this.hands, this.face);
      new Cursor();

      this.syncTime();
    });
  }

  async syncTime() {
    const start = new Date();

    this.hands.setTime(start);
    this.face.rotate();
    this.alarm.alarm(start);

    //Calculate framerate and how long to wait for next tick
    const end = new Date();
    const slt = end.getTime() - this.lasttime.getTime(); //Since end of Last Tick
    const stt = end.getTime() - start.getTime(); //Since start of This Tick
    const framerate = Math.round(1000 / slt);
    if (framerate < 30)
      document.querySelector('body > span').textContent = framerate;
    this.lasttime = end;
    const wait = 20 - stt;
    setTimeout(this.syncTime.bind(this), wait);
  }
}

new Main();
