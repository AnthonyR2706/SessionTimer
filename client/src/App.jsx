import { React, useState, useEffect } from 'react'
import { TimeControl } from './components'
import { PlayPause } from './assets/PlayPause';
import { Reset } from './assets/Reset';

const App = () => {
  const [getSession, setSession] = useState(25);
  const [getBreak, setBreak] = useState(5);
  const [getTime, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [getLable, setLable] = useState("Session")

  const propPack = {
    isSession: isSession,
    isRunning: isRunning,
    setTime: setTime,
  };

  const minutes = Math.floor(getTime / 60);
  const seconds = Math.floor(getTime % 60);

  const audio = new Audio('https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav');

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(1500);
    setIsSession(true)
    setLable("Session")
    setSession(25)
    setBreak(5)
    setIsRunning(false)
  }

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      if(getTime > 0){
        intervalId = setInterval(() => setTime(getTime - 1), 1000);
      } else {
        audio.play();
        if(isSession){
          setTime(getBreak * 60)
          setLable("Break")
        } else {
          setTime(getSession * 60)
          setLable("Session")
        }
        setIsSession(!isSession)
      }
    }
    return () => clearInterval(intervalId);
  }, [isRunning, getTime]);

  return (
    <div className='app__wrapper'>
      <div className='timerContainer'>
        <div className='title'>
          25 + 5 Clock
        </div>
        <div className='controllerContainer'>
          <TimeControl
            text={"Break Length"}
            setLocalTime = {setBreak}
            getTime = {getBreak}
            {...propPack}
          />
          <TimeControl
            text={"Sessions Length"}
            setLocalTime = {setSession}
            getTime = {getSession}
            {...propPack}
          />
        </div>
        <div className='innerTimerContainer'>
          {getLable}
          <br/>
          <div className='timer'>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
          </div>
        </div>
        <div className='buttons'>
            <div className='playPauseButton' onClick={handlePause}>
              <PlayPause/>
            </div>
            <div className='resetButton' onClick={handleReset}>
              <Reset/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default App