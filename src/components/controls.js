import React, { useContext } from "react";
import PuzzleContext from "../context/puzzleContext";
import { secondsToHms } from "../utils/puzzleUtil";

function Controls() {
  const {
    start,
    mute,
    setMute,
    pause,
    reset,
    timer,
    showSuccess,
    isTimerRunning,
    changePicture,
  } = useContext(PuzzleContext);

  return (
    <div className="controls">
      <div className="controls__button__sound__container">
        <button
          className={`pointer controls__button__sound`}
          onClick={() => setMute(!mute)}
        >
          {mute ? "🔇" : "🔊"}
        </button>
      </div>
      <button
        disabled={showSuccess}
        className="controls__button top-left pointer"
        onClick={isTimerRunning ? pause : start}
      >
        {isTimerRunning ? "Pause" : timer === 0 ? "Start" : "Resume"}
      </button>
      <button className="controls__button top-right">
        {secondsToHms(timer)}
      </button>
      <button
        disabled={showSuccess}
        className="controls__button bottom-left pointer"
        onClick={() => reset(!isTimerRunning && timer === 0)}
      >
        {!isTimerRunning && timer === 0 ? "Shuffle" : "Reset"}
      </button>
      <button
        disabled={showSuccess}
        className="controls__button bottom-right pointer"
        onClick={changePicture}
      >
        Change picture
      </button>
    </div>
  );
}

export default Controls;
