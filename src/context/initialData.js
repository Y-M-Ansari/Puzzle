const audioUrls = [
  "./sounds/swap.mp3",
  "./sounds/swapfail.mp3",
  "./sounds/shuffle.mp3",
  "./sounds/success.mp3",
];

const initialData = {
  positionMap: Array.from(Array(16).keys()),
  positionPercentMap: [
    { x: 0, y: 0 },
    { x: 0.25, y: 0 },
    { x: 0.5, y: 0 },
    { x: 0.75, y: 0 },
    { x: 0, y: 0.25 },
    { x: 0.25, y: 0.25 },
    { x: 0.5, y: 0.25 },
    { x: 0.75, y: 0.25 },
    { x: 0, y: 0.5 },
    { x: 0.25, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.75, y: 0.5 },
    { x: 0, y: 0.75 },
    { x: 0.25, y: 0.75 },
    { x: 0.5, y: 0.75 },
    { x: 0.75, y: 0.75 },
  ],
  images: [
    "./pictures/image1.jpg",
    "./pictures/image2.jpg",
    "./pictures/image3.jpg",
    undefined,
  ],
  audioData: audioUrls.map((url) => {
    return {
      url,
      audio: new Audio(url),
    };
  }),
};

export default initialData;
