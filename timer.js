const result = document.querySelector('.result');
class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.running = false;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart) this.onStart(this.timeRemaining);
    if (!this.running) {
      this.tick();
      this.timerID = setInterval(this.tick, 20);
      this.running = true;
    }
  };
  pause = () => {
    clearInterval(this.timerID);
    this.running = false;
  };
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) this.onComplete();
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = `${time.toFixed(2)}`;
    // result.innerHTML = `${time.toFixed(2): ${time.toFixed(2)}}`
  }
}

export default Timer;
