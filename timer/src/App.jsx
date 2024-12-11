import { useState } from 'react'

function App() {
  const [state, setState] = useState(5)
  const [session, setSession] = useState(25)

  // For breakLength
  const incrementState =  () => {
    state < 60 ? setState(state + 1) : setState(60)
  }
  const decrementState  = () => {
    state > 1 ? setState(state - 1) : setState(1)
  }

  // For sessionLength
  const incrementSession =  () => {
    session < 60 ? setSession(session + 1) : setSession(60)
  }
  const decrementSession = () => {
     session > 1 ? setSession(session - 1) : setSession(1)
  }

  let interval = null;
  let remainingTime = Math.floor(session * 60);
  let remainingBreak = Math.floor(state * 60)
  const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const timerLabel = document.getElementById('timer-label')

  // For animation of flipping
  function flipCard(unit, newValue) {
    const card = document.getElementById(unit);
    const top = card.querySelector(".top");
    const bottom = card.querySelector(".bottom");

    // Set the new value
    bottom.textContent = newValue;

    // Add flip animation
    card.classList.add("flip");

    // Reset animation after it completes
    setTimeout(() => {
        top.textContent = newValue;
        card.classList.remove("flip");
    },500);
  }
  

  // Example: Flip the seconds card
  const stop = () => {
    clearInterval(interval)
    interval = null;
  }

  const alarm = () => {
    const beep = document.getElementById('beep');

    beep.currentTime = 0
    beep.play()
  }

  const start = () => {
    if(remainingTime === 0) return;

    interval = setInterval(() => {
      timerLabel.textContent = 'Session';
      remainingTime--;
      const seconds = Math.floor(remainingTime % 60);
      const minutes = Math.floor(remainingTime / 60);
      flipCard("seconds", seconds < 10 ? `0${seconds}` : seconds);
      flipCard("minutes", minutes < 10 ? `0${minutes}` : minutes);

      if(remainingTime === 0){
        stop()
        if(state > 0){
          if(remainingBreak === 0) return;
          alarm()

          setTimeout(() => {
            interval = setInterval(() => {
              timerLabel.textContent = 'Break'
              remainingBreak--;
              const seconds = Math.floor(remainingBreak % 60);
              const minutes = Math.floor(remainingBreak / 60);
              flipCard("seconds", seconds < 10 ? `0${seconds}` : seconds);
              flipCard("minutes", minutes < 10 ? `0${minutes}` : minutes);

              if(remainingBreak === 0){
                stop()
                if(session > 0){
                  
                }
              }
            }, 1000)
          },2000)
        }
      }
    }, 1000);

  }

  const startPause = () =>{
    if(interval === null){
      start()
    }else{
      stop()
    }
  }

  const reset = () => {
    setState(5)
    setSession(25)
    stop()
    timerLabel.textContent = '25 + 5 Clock';
  }

  return (
    <>
      <div className="wrapper">
        <audio id="beep" src="./assets/alarm-sound.m4a"></audio>
        <h2 id="timer-label">25 + 5 Clock</h2>
        <div className="length-wrapper">
          <div className="break-length">
            <p id="break-label">Break Length</p>
            <i class='bx bx-up-arrow-alt' id="break-increment" onClick={incrementState}></i>
            <span id="break-length">{state}</span>
            <i class='bx bx-down-arrow-alt' id="break-decrement" onClick={decrementState}></i>
          </div>
          <div className="session-length">
            <p id="session-label">Session Length</p>
            <i class='bx bx-up-arrow-alt' id="session-increment" onClick={incrementSession}></i>
            <span id="session-length">{session}</span>
            <i class='bx bx-down-arrow-alt' id="session-decrement" onClick={decrementSession}></i>
          </div>
        </div>

        <div className="timer">
          <div class="flip-unit">
            <div class="card" id="minutes">
              <div class="top" id="time-left">{minutes}</div>
              <div class="bottom">{minutes}</div>
            </div>
            <span className="time">Minutes</span>
          </div>

          <div class="flip-unit">
            <div class="card" id="seconds">
              <div class="top">{seconds}</div>
              <div class="bottom">{seconds}</div>
            </div>
            <span className="time">Seconds</span>
          </div>
        </div>

        <div className="reset-pause">
          <i class='bx bx-pause-circle' id="start_stop" onClick={startPause}></i><i class='bx bx-reset' id="reset" onClick={reset}></i>     
        </div>
      </div>
    </>
  )
}

export default App
