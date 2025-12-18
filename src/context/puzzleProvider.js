import PuzzleContext from "./puzzleContext";

import { useRef, useState } from "react";

import initialData from "./initialData";
import {
  shuffleArray,
  checkAllPiecesInActualPosition,
} from "../utils/puzzleUtil";
import useAudio from "../hooks/useAudio";

export default function PuzzleProvider({ children }) {
  const [positionMap, setPositionMap] = useState(initialData.positionMap);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(initialData.images[imageIndex]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [playAudio, mute, setMute] = useAudio(initialData.audioData);

  const intervalRef = useRef(null);

  const changeImage = () => {
    const newIndex = imageIndex + 1;
    setImageIndex(newIndex);
    setImageUrl(initialData.images[newIndex % initialData.images.length]);
  };

  const reset = (shuffle) => {
    setTimer(0);
    setIsTimerRunning(false);
    clearTimer();
    playAudio(2);
    if (shuffle) {
      const newArr = [...shuffleArray(Array.from(Array(15).keys())), 15];
      setPositionMap(newArr);
    } else {
      setPositionMap(initialData.positionMap);
    }
  };

  const start = () => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    setIsTimerRunning(true);
    if (checkAllPiecesInActualPosition(positionMap)) {
      reset(true);
      return true;
    }
    return false;
  };

  const pause = () => {
    clearTimer();
    setIsTimerRunning(false);
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const changePicture = () => {
    reset(false);
    changeImage();
  };

  const swap = (current = undefined, next = undefined, pMap) => {
    if (current !== undefined && next !== undefined) {
      const newPositionMap = [...pMap];
      [newPositionMap[current], newPositionMap[next]] = [
        newPositionMap[next],
        newPositionMap[current],
      ];

      playAudio(0);
      setPositionMap(newPositionMap);

      if (checkAllPiecesInActualPosition(newPositionMap)) {
        playAudio(3);
        pause();
        setShowSuccess(true);
      }
    }
  };

  return (
    <PuzzleContext.Provider
      value={{
        positionMap,
        positionPercentMap: initialData.positionPercentMap,
        reset,
        start,
        pause,
        isTimerRunning,
        timer,
        changePicture,
        imageUrl,
        changeImage,
        swap,
        showSuccess,
        setShowSuccess,
        playAudio,
        setMute,
        mute,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
}
