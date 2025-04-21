class FaceRotator {
  id;
  speed;
  rotating;
  constructor(id) {
    this.id = id;
    this.speed = Math.random() * 60 - 30;
    this.rotating = true;
    document.getElementById('speed-slider-' + this.id).value = this.speed;
    document
      .getElementById('speed-slider-' + this.id)
      .addEventListener('input', this.setSpeed.bind(this));
    document
      .getElementById(this.id + '-moving')
      .addEventListener('input', (e) => {
        this.rotating = e.target.checked;
      });
  }
  updateRotation() {
    if (!this.rotating) return;
    document
      .getElementById('digits-' + this.id)
      .style.setProperty(
        '--offset',
        ((parseFloat(
          document
            .getElementById('digits-' + this.id)
            .style.getPropertyValue('--offset')
        ) +
          this.speed / 100) %
          360) +
          'deg'
      );
  }
  setSpeed(e) {
    this.speed = e.target.value;
  }
}
