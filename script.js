clockspeed = 1;
minutesspeed = Math.random() * 60 - 30; //degree per second
hoursspeed = Math.random() * 60 - 30; //degree per second
//Face
rotate = () => {
  document
    .getElementById('digits-min')
    .style.setProperty(
      '--offset',
      ((parseFloat(
        document.getElementById('digits-min').style.getPropertyValue('--offset')
      ) +
        minutesspeed / 100) %
        360) +
        'deg'
    );
  document
    .getElementById('digits-h')
    .style.setProperty(
      '--offset',
      ((parseFloat(
        document.getElementById('digits-h').style.getPropertyValue('--offset')
      ) +
        hoursspeed / 100) %
        360) +
        'deg'
    );
};

//Hands
setMinutes = (angleOfMinutes) => {
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
    hour = (hour + 6) % 24;
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
  alarm(hours);
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

setTime = (hours, minutes, seconds, milliseconds) => {
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
previousminangle = null;
previoushangle = null;
alarm = (hours) => {
  let currentminangle =
    angleOfMinutes -
    parseFloat(
      document.getElementById('digits-min').style.getPropertyValue('--offset')
    );
  if (currentminangle < 0) currentminangle = 360 + currentminangle;
  let currenthangle =
    angleOfHours -
    parseFloat(
      document.getElementById('digits-h').style.getPropertyValue('--offset')
    );
  if (currenthangle < 0) currenthangle = 360 + currenthangle;
  const alarmminangle =
    360 +
    parseFloat(
      document.getElementById('target-min').style.getPropertyValue('--rot')
    );
  const alarmhangle =
    360 +
    parseFloat(
      document.getElementById('target-h').style.getPropertyValue('--rot')
    );
  if (
    previoushangle < alarmhangle + 15 &&
    currenthangle > alarmhangle - 15 &&
    previousminangle < alarmminangle &&
    currentminangle >= alarmminangle
  ) {
    if (
      (hours < 12 && document.getElementById('alarmam').checked) ||
      (hours >= 12 && document.getElementById('alarmpm').checked)
    ) {
      new Audio('assets/alarm.mp3').play();
    }
  }
  previoushangle = currenthangle;
  previousminangle = currentminangle;
};
