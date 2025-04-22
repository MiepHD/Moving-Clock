class Cursor {
  timeout;
  root;
  constructor() {
    this.root = document.querySelector(':root');
    document.addEventListener('mousemove', this.move.bind(this));
  }
  move() {
    this.root.style.removeProperty('cursor');
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(this.hideCursor.bind(this), 1000);
  }
  hideCursor() {
    this.root.style.cursor = 'none';
  }
}
