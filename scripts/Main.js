class Main {
  hands;
  face;
  alarm;
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.hands = new Hands();
      this.face = new Face();
      this.alarm = new Alarm(this.hands, this.face);

      setInterval(this.syncTime.bind(this), 10);

      const time = new Date();
      const hours = time.getHours();
      this.face.updateHours(hours);
      this.face.updateHours(hours - 1);
      this.face.updateHours(hours - 2);
      this.face.updateHours(hours - 3);
      this.face.updateHours(hours - 4);
      this.face.updateHours(hours - 5);
      this.face.updateHours(hours - 6);
    });
  }

  syncTime() {
    const time = new Date();
    this.hands.setTime(time);
    const hours = time.getHours();
    this.face.rotate(hours);
    this.alarm.alarm(hours);
  }
}
new Main();
