class Timer {
  constructor(durationInput,formInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput
    this.formInput = formInput;
    this.totalTimeInSeconds = 0;
    this.duration=null;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.running = false;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
   
      this.formInput.addEventListener("submit",(e)=>{
        e.preventDefault();
        let mins,seconds;
        let inputVal = "";
        const formData = new FormData(e.target);
        inputVal = formData.get("timerValues");
        mins = parseFloat(inputVal.slice(0,2));
        seconds = parseFloat(inputVal.slice(3))
        this.totalTimeInSeconds = mins *60 + seconds;
        this.duration = mins *60 + seconds;
      })
  

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart && this.duration ===this.totalTimeInSeconds  ) this.onStart(this.duration);
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

    if (this.durationInput.value === `00:00`) {
      this.pause();
      if (this.onComplete) this.onComplete();
    } else {
      this.duration = this.duration <= 0 ? 0 : this.duration;
      this.duration = this.duration - 0.02;
      let minutes = Math.floor(this.duration / 60);
      minutes = minutes < 0 ? 0 : minutes;
      let seconds = (this.duration % 60).toFixed(2);
      seconds = seconds < 0 ? 0 : seconds;
      let result = this.duration > 0.02 ? `${minutes}: ${seconds < 10 ? (seconds = `0${seconds}`) : seconds}` : '00:00';
      this.durationInput.value= result;
      if (this.onTick) {
        this.onTick(parseFloat(minutes * 60) + parseFloat(seconds));
      }
    }
  };
}

