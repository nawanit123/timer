class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.duration = parseFloat(this.durationInput.value);
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.running = false;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    this.durationInput.addEventListener("change",()=>{
      this.duration =parseFloat(this.durationInput.value);
    })
    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart && parseFloat(this.durationInput.value) ===this.duration) {
      this.onStart(this.duration);
    }
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
    if (this.durationInput.value <= 0) {
      this.pause();
      if (this.onComplete){
        
        this.onComplete();
      } 
    } else {
      this.duration = this.duration <= 0 ? 0 : this.duration;
      this.duration = this.duration - 0.02;
      let minutes = Math.floor(this.duration / 60);
      minutes = minutes < 0 ? 0 : minutes;
      let seconds = (this.duration % 60).toFixed(2);
      seconds = seconds < 10 ? (seconds = `0${seconds}`) : seconds;
      seconds = seconds < 0 ? 0 : seconds;
      let result = this.duration > 0.02 ? `${minutes}: ${seconds}` : '0';
      this.durationInput.value = result;
      if (this.onTick) {
        this.onTick(minutes * 60 + seconds);
      }
    }
  };
}

export default Timer;
