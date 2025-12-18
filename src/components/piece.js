import React, { useEffect, useContext, useState, useMemo } from "react";
import {
  getBGPositionFromPercent,
  checkSwap,
  getPosition,
} from "../utils/puzzleUtil";
import PuzzleContext from "../context/puzzleContext";

function Piece({ actualPosition }) {
  const [shake, setShake] = useState();
  const [pieceMatch, setPieceMatch] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(true);
  const {
    positionPercentMap,
    positionMap,
    swap,
    imageUrl,
    start,
    isTimerRunning,
    playAudio,
    timer,
    showSuccess,
  } = useContext(PuzzleContext);

  useEffect(() => {
    const currentPosition = getPosition(actualPosition, positionMap);
    if (timer !== 0 || isTimerRunning) {
      if (currentPosition === actualPosition && transitionEnd) {
        setPieceMatch(true);
        return;
      }
    }
    setPieceMatch(false);
  }, [actualPosition, positionMap, isTimerRunning, timer, transitionEnd]);

  const handleClick = () => {
    const { isSwappable, swapBetween } = checkSwap(actualPosition, positionMap);
    if (!isTimerRunning) {
      const isShuffled = start();
      if (isShuffled) return;
    }
    if (isSwappable) {
      setTransitionEnd(false);
      swap(swapBetween[0], swapBetween[1], positionMap);
    } else {
      playAudio(1);
      setShake(true);
    }
  };

  const isEmptyPiece = useMemo(() => actualPosition === 15, [actualPosition]);

  const getPositionPercent = useMemo(() => {
    const pos = positionPercentMap[getPosition(actualPosition, positionMap)];
    return pos;
  }, [actualPosition, positionMap, positionPercentMap]);

  return (
    <div
      onAnimationEnd={() => setShake(false)}
      onTransitionEnd={() => setTransitionEnd(true)}
      className={`piece${isEmptyPiece ? " empty" : " pointer"}${
        imageUrl ? "" : " piece__with-numbers"
      }${shake ? " shake" : ""}`}
      onClick={() => {
        !isEmptyPiece && handleClick();
      }}
      style={{
        ...(!isEmptyPiece &&
          imageUrl && { backgroundImage: `url(${imageUrl})` }),
        "--position": `translate(calc(min(60vh, 60vw)*${getPositionPercent.x}), calc(min(60vh, 60vw)*${getPositionPercent.y}))`,
        backgroundPosition: `${getBGPositionFromPercent(
          positionPercentMap[actualPosition].x
        )} ${getBGPositionFromPercent(positionPercentMap[actualPosition].y)}`,
      }}
    >
      {!imageUrl && !isEmptyPiece && actualPosition + 1}
      {pieceMatch && !isEmptyPiece && !showSuccess && (
        <div className="piece-match"></div>
      )}
    </div>
  );
}

export default Piece;
