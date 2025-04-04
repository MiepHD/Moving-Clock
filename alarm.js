document.addEventListener('DOMContentLoaded', () => {
  new Rotator(document.getElementById('target-h'));
  new Rotator(document.getElementById('target-min'));
});
class Rotator {
  constructor(element) {
    this.elem = element;
    this.elem.addEventListener('mousedown', this.start.bind(this));
    this.elem.addEventListener('touchstart', this.start.bind(this));
  }
  start() {
    document.addEventListener('mouseup', this.save.bind(this), {
      once: true,
    });
    document.addEventListener('touchend', this.save.bind(this), {
      once: true,
    });
    this.update = this.update.bind(this);
    document.addEventListener('mousemove', this.update);
    document.addEventListener('touchmove', this.update);
  }
  save() {
    document.removeEventListener('mousemove', this.update);
    document.removeEventListener('touchmove', this.update);
  }
  update(e) {
    if (e.touches) e = e.touches[0];
    const middle = document.getElementById('middle').getBoundingClientRect();
    const x = e.clientX - middle.x;
    const y = e.clientY - middle.y;
    let angle = Math.atan(y / x) * (180 / Math.PI);
    if (x < 0) angle = angle + 180;
    this.elem.style.setProperty(
      '--rot',
      angle -
        parseFloat(this.elem.parentElement.style.getPropertyValue('--offset')) +
        'deg'
    );
  }
}
