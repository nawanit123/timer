import Timer from './Timer.js';
const durationInput = document.querySelector("#duration");
const formInput = document.querySelector('form');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');


const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let currentDuration;

    const timer = new Timer(durationInput,formInput, startButton, pauseButton, {
      onStart(totalDuration) {
        currentDuration = totalDuration;
      },
      onTick(timeRemaining) {
        circle.setAttribute(
          'stroke-dashoffset',
          `${-(Math.abs((perimeter * timeRemaining) / currentDuration - perimeter))}`
        );
      },
      onComplete() {
        alert('Timer just completed!');
      },
    });
