import Puzzle from "./components/puzzle";
import PuzzleProvider from "./context/puzzleProvider";
import { useEffect } from "react";
import initialData from "./context/initialData";

function App() {
  useEffect(() => {
    initialData.images.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, []);

  return (
    <PuzzleProvider>
      <Puzzle />
    </PuzzleProvider>
  );
}

export default App;
