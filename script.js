clockspeed = 1;
minutesspeed = Math.random() * 60 - 30; //degree per second
hoursspeed = Math.random() * 60 - 30; //degree per second
minutesspeed = 0;
hoursspeed = 0;
//Face
rotate = () => {
  document
    .getElementById('digits-min')
    .style.setProperty(
      '--offset',
      parseFloat(
        document.getElementById('digits-min').style.getPropertyValue('--offset')
      ) +
        minutesspeed / 100 +
        'deg'
    );
  document
    .getElementById('digits-h')
    .style.setProperty(
      '--offset',
      parseFloat(
        document.getElementById('digits-h').style.getPropertyValue('--offset')
      ) +
        hoursspeed / 100 +
        'deg'
    );
};

//Hands
angleOfMinutes = Math.random() * 360;
setMinutes = () => {
  if (angleOfMinutes > 360) angleOfMinutes = angleOfMinutes % 360;
  document.getElementById('minutes').style.transform =
    'rotate(' + angleOfMinutes + 'deg)';
};
setHours = () => {
  if (angleOfHours > 360) angleOfHours = angleOfHours % 360;
  document.getElementById('hours').style.transform =
    'rotate(' + angleOfHours + 'deg)';
};

let lasthour;
updateHours = (hour) => {
  if (!lasthour || hour != lasthour) {
    lasthour = hour;
    hour = hour + (6 % 24);
    document.querySelector(`span.d${hour}`).textContent = hour;
  }
};

syncTime = () => {
  rotate();
  time = new Date();
  hours = time.getHours();
  minutes = time.getMinutes();
  seconds = time.getSeconds();
  milliseconds = time.getMilliseconds();
  updateHours(hours);
  setTime(hours, minutes, seconds, milliseconds);
};
document.addEventListener('DOMContentLoaded', () => {
  syncTime();
  document.getElementById('minutesspeed').value = minutesspeed;
  document.getElementById('minutesspeed').addEventListener('input', (e) => {
    minutesspeed = e.target.value;
  });
  document.getElementById('hoursspeed').value = hoursspeed;
  document.getElementById('hoursspeed').addEventListener('input', (e) => {
    hoursspeed = e.target.value;
  });

  time = new Date();
  hours = time.getHours();
  updateHours(hours);
  updateHours(hours - 1);
  updateHours(hours - 2);
  updateHours(hours - 3);
  updateHours(hours - 4);
  updateHours(hours - 5);
  updateHours(hours - 6);
});

setInterval(syncTime, 10);

setTime = (hours, minutes, seconds) => {
  angleOfMinutes =
    (minutes * 60 + seconds + milliseconds / 1000) / 10 +
    +parseFloat(
      document.getElementById('digits-min').style.getPropertyValue('--offset')
    );
  setMinutes(angleOfMinutes);

  angleOfHours =
    (hours * 60 + minutes + seconds / 60) / 2 +
    parseFloat(
      document.getElementById('digits-h').style.getPropertyValue('--offset')
    );
  setHours(angleOfHours);
};
