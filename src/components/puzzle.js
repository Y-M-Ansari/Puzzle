import React, { useContext } from "react";
import Piece from "./piece";
import PuzzleContext from "../context/puzzleContext";
import Controls from "./controls";
import { secondsToHms } from "../utils/puzzleUtil";

function Puzzle() {
  const { imageUrl, timer, reset, showSuccess, setShowSuccess } =
    useContext(PuzzleContext);

  const handleAnimationEnd = () => {
    setShowSuccess(false);
    reset(false);
  };

  return (
    <div className="puzzle">
      <Controls />
      <div className="github-link">
        <a href="https://github.com/Y-M-Ansari" target="_blank" rel="noreferrer">
          <img alt="github" src="./github.svg" title="Amith-B GitHub" />
        </a>
      </div>
      <div className="container">
        {showSuccess && (
          <div className="game-success" onAnimationEnd={handleAnimationEnd}>
            Completed In: {secondsToHms(timer)}
          </div>
        )}
        {Array.from(Array(16).keys()).map((actualPosition) => {
          return <Piece key={actualPosition} actualPosition={actualPosition} />;
        })}
      </div>
      {imageUrl && (
        <div
          className="normal-picture"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      )}
    </div>
  );
}

export default Puzzle;
