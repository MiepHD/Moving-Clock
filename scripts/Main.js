class Main {
  hands;
  face;
  alarm;
  lasttime;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.hands = new Hands();
      this.face = new Face();
      this.alarm = new Alarm(this.hands, this.face);
      this.lasttime = new Date();

      //Change hours to 24-hour format
      const hours = this.lasttime.getHours();
      for (let i = 0; i <= 6; i++) {
        this.face.updateHours(hours - i);
      }
      this.syncTime();
    });
  }

  async syncTime() {
    const start = new Date();

    this.hands.setTime(start);
    this.face.rotate();
    this.alarm.alarm(start.getHours());

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
