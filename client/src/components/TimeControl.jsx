import { React, useEffect } from 'react'
import { DownArrow } from "../assets/DownArrow.js";
import { UpArrow } from "../assets/UpArrow.js";

const TimeControl = ({text, setLocalTime, getTime, isSession, isRunning, setTime}) => {
  const handleDecrement = () => {
    if (getTime != 1 && !isRunning){
      setLocalTime(getTime - 1);
    }
  }
  const handleIncrement = () => {
    if (getTime != 60 && !isRunning){
      setLocalTime(getTime + 1)
    }
  }
  useEffect(() => updateTime(), [getTime])
  
  const updateTime = () => {
    if((isSession && text == "Sessions Length") || (!isSession && text == "Break Length")){
        setTime(getTime * 60)
    }
  }
  return (
    <div className='timeControlContainer'>
      <div className='timeControlHeader'>
        {text}
      </div>
      <div className='timeControl'>
      <div className='downArrowContainer' onClick={handleDecrement}>
          <DownArrow className = "downArrow"/>
        </div>
        <div className='timeText'>
          {getTime}
        </div>
        <div className='upArrowContainer' onClick={handleIncrement}>
          <UpArrow className = "upArrow"/>
        </div>
      </div>
    </div>
  )
}

export default TimeControl