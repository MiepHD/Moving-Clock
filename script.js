clockspeed = 60; //degree per second
minutesspeed = 0; //degree per second
hoursspeed = 0; //degree per second

setInterval(() => {
  document
    .getElementById('digits-h')
    .style.setProperty(
      '--offset',
      parseInt(
        document.getElementById('digits-h').style.getPropertyValue('--offset')
      ) +
        hoursspeed +
        'deg'
    );
}, 100);
setInterval(() => {
  document
    .getElementById('digits-min')
    .style.setProperty(
      '--offset',
      parseInt(
        document.getElementById('digits-min').style.getPropertyValue('--offset')
      ) +
        minutesspeed +
        'deg'
    );
}, 10);
angleOfMinutes = 270;
setInterval(() => {
  const minhand = document.getElementById('minutes');
  if (angleOfMinutes > 360) {
    angleOfMinutes = angleOfMinutes - 360;
    minhand.style.transform = 'rotate(' + angleOfMinutes + 'deg)';
  }
  angleOfMinutes = angleOfMinutes + 0.001 * clockspeed;
  minhand.style.transform = 'rotate(' + angleOfMinutes + 'deg)';
}, 10);
angleOfHours = 270;
setInterval(() => {
  if (angleOfHours > 360) {
    angleOfHours = angleOfHours % 360;
    document.getElementById('hours').style.transition = 'rotate 0s';
    document.getElementById('hours').style.transform =
      'rotate(' + angleOfHours + 'deg)';
    document.getElementById('hours').style.transition = '';
  }
  angleOfHours = angleOfHours + (0.001 / 12) * clockspeed;
  document.getElementById('hours').style.transform =
    'rotate(' + angleOfHours + 'deg)';
}, 10);
