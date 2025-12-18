import initialData from "./../context/initialData";

export const getBGPositionFromPercent = (val) => {
  switch (val) {
    case 0.25:
      return "33%";
    case 0.5:
      return "66%";
    case 0.75:
      return "100%";
    case 0:
      return "0%";
    default:
      return "0%";
  }
};

export const getPosition = (actualPosition, positionMap) => {
  return positionMap.findIndex((pIndex) => pIndex === actualPosition);
};

export const checkSwap = (actualPosition, positionMap) => {
  let isSwappable = false;
  let swapBetween = undefined;
  const position = getPosition(
    actualPosition,
    positionMap,
    initialData.positionPercentMap
  );
  // top
  if (positionMap[position - 4] === 15) {
    isSwappable = true;
    swapBetween = [position, position - 4];
  }
  // right
  else if (
    positionMap[position + 1] === 15 &&
    ![4, 8, 12].includes(position + 1)
  ) {
    isSwappable = true;
    swapBetween = [position, position + 1];
  }
  //bottom
  else if (positionMap[position + 4] === 15) {
    isSwappable = true;
    swapBetween = [position, position + 4];
  }
  //left
  else if (
    positionMap[position - 1] === 15 &&
    ![3, 7, 11].includes(position - 1)
  ) {
    isSwappable = true;
    swapBetween = [position, position - 1];
  }
  return {
    isSwappable,
    swapBetween,
  };
};

export function secondsToHms(d) {
  if (d === 0) {
    return "0 sec";
  }
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hr, " : " hr, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " min, " : " min, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " sec" : " sec") : "";
  return hDisplay + mDisplay + sDisplay;
}

export function getInverseArray(arr) {
  const invArr = [];
  arr.forEach((v, i) => {
    invArr[v] = i;
  });

  return invArr;
}

export function shuffleArray(array) {
  const arr = [...array];
  let currentIndex = arr.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}

export function checkAllPiecesInActualPosition(arr) {
  return arr.every((v, i) => v === i);
}
