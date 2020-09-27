import Timer from './Timer.js';

const formInput = document.querySelector('form');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
let inputVal = "";
let mins,sec,totalTimeinSeconds;
formInput.addEventListener("submit",(e)=>{
  const formData = new FormData(e.target);
  e.preventDefault();
  inputVal = formData.get("timerValues");
  mins = parseFloat(inputVal.slice(0,2));
  sec = parseFloat(inputVal.slice(3))
  totalTimeinSeconds = mins *60 + sec
})

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
