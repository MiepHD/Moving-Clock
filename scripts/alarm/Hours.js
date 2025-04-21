class Hours extends Rotator {
  updateOtherHand(angleHours) {
    const angleMinutes = (angleHours % 30) * 12;
    document
      .getElementById('target-min')
      .style.setProperty('--rot', angleMinutes + 'deg');
  }
}
