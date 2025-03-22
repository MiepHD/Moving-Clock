clockspeed = 60;
minutesspeed = 2 / 60; //degree per second
hoursspeed = -1 / 60; //degree per second

setInterval(() => {
  document
    .getElementById('digits-h')
    .style.setProperty(
      '--offset',
      parseFloat(
        document.getElementById('digits-h').style.getPropertyValue('--offset')
      ) +
        (hoursspeed / 100) * clockspeed +
        'deg'
    );
}, 10);
setInterval(() => {
  document
    .getElementById('digits-min')
    .style.setProperty(
      '--offset',
      parseFloat(
        document.getElementById('digits-min').style.getPropertyValue('--offset')
      ) +
        (minutesspeed / 100) * clockspeed +
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
  angleOfMinutes =
    angleOfMinutes + 0.001 * clockspeed * (1 + minutesspeed * 10);
  minhand.style.transform = 'rotate(' + angleOfMinutes + 'deg)';
}, 10);
angleOfHours = 270;
setInterval(() => {
  if (angleOfHours > 360) {
    angleOfHours = angleOfHours % 360;
    document.getElementById('hours').style.transform =
      'rotate(' + angleOfHours + 'deg)';
  }
  angleOfHours =
    angleOfHours + (0.001 * clockspeed * (1 + hoursspeed * 120)) / 12;
  document.getElementById('hours').style.transform =
    'rotate(' + angleOfHours + 'deg)';
}, 10);
