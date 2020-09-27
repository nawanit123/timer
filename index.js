import Timer from './Timer.js';

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let currentDuration;

    const timer = new Timer(durationInput, startButton, pauseButton, {
      onStart(totalDuration) {
        currentDuration = totalDuration;
      },
      onTick(timeRemaining) {
        circle.setAttribute(
          'stroke-dashoffset',
          (perimeter * timeRemaining) / currentDuration - perimeter
        );
      },
      onComplete() {
        alert('Timer just completed!');
      },
    });
