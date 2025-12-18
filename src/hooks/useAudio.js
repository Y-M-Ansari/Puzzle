import { useEffect, useState } from "react";

const useAudio = (urlMap) => {
  const [sources] = useState(urlMap);

  const [mute, setMute] = useState(false);

  useEffect(() => {
    playAudio(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mute]);

  const [players, setPlayers] = useState(
    urlMap.map(({ url }) => {
      return {
        url,
        playing: false,
      };
    })
  );

  const playAudio = (targetIndex) => {
    const newPlayers = players.map((p, i) => {
      return {
        ...p,
        playing: i === targetIndex,
      };
    });

    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      try {
        source.audio.pause();
        source.audio.currentTime = 0;
        if (players[i].playing && !mute) {
          source.audio.play();
        }
      } catch (error) {}
    });
  }, [sources, players, mute]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources]);

  return [playAudio, mute, setMute];
};

export default useAudio;
