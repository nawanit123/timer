import Timer from './Timer.js';

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let duration = durationInput.value;

// var date = new Date(null);
// date.setSeconds(duration); // specify value for SECONDS here
// var result = date.toISOString().substr(11, 8);
durationInput.addEventListener('change', () => {
  duration = durationInput.value;
});
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    // duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    alert('Timer just completed!');
  },
});
