import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import Bpm from '../helpers/useBPM';
import PlayButton from '../Components/PlayButton';
import { instruments } from '../helpers/instruments';
import StopButton from '../Components/StopButton';
import "../styles/market.css"
export default (arr1) => {
  const arr2 = Object.values(arr1).toString()
  const arr3 = arr2.split(",")
  const [isPlaying, setIsPlaying] = useState(false);
  const squares =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
  // eslint-disable-next-line no-unused-vars
  const [playHeadArray, setPlayHeadArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const [counter, setCounter] = useState(0);
  const tempo = 120;
  let beats = Bpm(tempo);
  const grid = [
    instruments[0].pattern,
    instruments[1].pattern,
    instruments[2].pattern,
    instruments[3].pattern,
    instruments[4].pattern,
    instruments[5].pattern,
    instruments[6].pattern,
    instruments[7].pattern,
    instruments[8].pattern,
    instruments[9].pattern,
    instruments[10].pattern,
    instruments[11].pattern,
    instruments[12].pattern,
    instruments[13].pattern,
    instruments[14].pattern,
    instruments[15].pattern,
  ];
  const playSound = (source) => {
    var sound = new Howl({
      src: [source],
      html5: true,
    });
    // console.log(sound)
    sound.play();
  };
  const playSounds = (array) => {
    for (let i = 0; i < 32; i++) {
      playSound(array[i]);
    }
  };
  const loop = () => {
    let soundArr = [];
    for (let j = 0; j < 16; j++) {
      if (grid[j][counter]) {
        let soundSrc = instruments[j].sound;
        soundArr.push(soundSrc);
      }
      playSounds(soundArr);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        loop();
        if (counter < 32) {
          setCounter((prevState) => ++prevState);
        } else {
          setCounter(0);
        }
      }, beats);
      return () => clearInterval(interval);
    }
    resetSquares();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, beats, counter]);

  const resetSquares = () => {
    setCounter(0);
    setPlayHeadArray(
      squares.map((square, i) => (
        <td
          key={i + squares}
          id={i}
          className={square > 0 ? 'playhead' : 'inactive cycle'}
        ></td>
      ))
    );
  };

  for (let i = 0; i < 512; i++) {
    if (arr3[i] === "0") {
      arr3[i] = 0
    }
  }

  for (let j = 0; j < 16; j++) {
    for (let i = 32 * j; i < 32 + 32 * j; i++) {  
      grid[0][i] = true;
      if (arr3[i][0] === "#") {
        grid[parseInt(i / 32)][i % 32] = true;
      }
    }
  }

  return (
    <div>
      <PlayButton onClick={togglePlay} isPlaying={isPlaying} /> <StopButton onClick={togglePlay} isPlaying={isPlaying} />
    </div>
  );
}