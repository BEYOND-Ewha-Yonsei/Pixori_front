/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Howl } from 'howler';
import html2canvas from 'html2canvas';
import InstrumentRow from '../Components/InstrumentRow';
import Modal from '../Components/Modal';
import Tempo from '../Components/Tempo';
import ColorPicker from '../Components/ColorPicker.js';
import Footer from "../Components/Footer.js"
import { instruments } from '../helpers/instruments';
import Bpm from '../helpers/useBPM';
import '../styles/index.css';
import '../styles/playhead.css';
import playbutton from "../img/btn_play_circle_purple.png"
import stopbutton from "../img/btn_stop_circle_purple.png"
import bpmbutton from "../img/btn_tempo_circle_purple.png"
import reload from "../img/btn_reset_circle_purple.svg"


const arr1 = Array.from(Array(16), () => new Array(32).fill(0));

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  const [hash, setHash] = useState("0");
  const panelRef = useRef()
  const [selectedColor, setColor] = useState("#000000");

  //beat machine initial states
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const squares = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];

  // state tracking for our dumb component when !isPlaying
  const [playHeadArray, setPlayHeadArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
  const [counter, setCounter] = useState(0);

  // holds on off state for each row of instruments
  const [grid, setGrid] = useState([
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
  ]);

  // TODO: Refactor player controls into helpers
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  //set BPM
  let beats = Bpm(tempo);

  //ParseInt() as tempo field currently a string
  const handleTempoChange = (event) => {
    const eventValue = event.target.value;
    setTempo(parseInt(eventValue));
  };

  //Animation Specific functions
  //helper function for playHeadLoop()
  const getPreviousSquare = () => {
    if (counter === 0) {
      return document.getElementById('31');
    } else {
      return document.getElementById(`${counter - 1}`);
    }
  };

  // animates playhead based off the counter position
  const playHeadLoop = () => {
    //get the square to animate
    let squareToAnimate = document.getElementById(`${counter}`);
    //find previousSquare
    let previousSquare = getPreviousSquare();
    //TODO Re-factor into one toggle
    previousSquare.classList.remove('playhead');
    previousSquare.classList.add('inactive');
    squareToAnimate.classList.remove('inactive');
    squareToAnimate.classList.add('playhead');
  };

  //when player is stopped reset playhead and array to initial values
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

  //handles any changes user makes to instrument grid and updates values accordingly
  const updateGrid = (row, column, toggle, color) => {
    const clonedObj = { ...grid[row] };
    console.log(clonedObj)
    clonedObj[column] = toggle;
    //temporary const for setGrid
    const arrayToPassSetGrid = [];
    for (let i = 0; i < 16; i++) {
      if (row === i) {
        arrayToPassSetGrid.push(clonedObj);
      } else {
        arrayToPassSetGrid.push(grid[i]);
      }
    }
    arr1[row].splice(column, 1, color)
    setGrid(arrayToPassSetGrid);
    console.log(arr1)
    console.log(grid)

  };

  //play an individual sound from our array from PlaySounds()
  const playSound = (source) => {
    var sound = new Howl({
      src: [source],
      html5: true,
    });
    console.log(sound)
    sound.play();
  };

  //Iterate through the array of collected sounds compiled from our grid in loop()
  const playSounds = (array) => {
    for (let i = 0; i < array.length; i++) {
      playSound(array[i]);
    }
  };

  //collate all active sound samples on the current beat into an array from instruments
  const loop = () => {
    //create an array to hold our sounds for a beat
    let soundArr = [];
    //loop through each instrument in our column
    for (let j = 0; j < 16; j++) {
      //if the square is active e.g. 0,0
      if (grid[j][counter]) {
        //set a temporary variable to hold our soundSrc
        let soundSrc = instruments[j].sound;
        //e.g. "./DrumSamples/ClosedHats/HiHat01.wav"
        soundArr.push(soundSrc);
      }
      playSounds(soundArr);
    }
  };

  //useEffect re-renders and runs our beat machine functions if IsPlaying per tick of setInterval
  useEffect(() => {
    //is the beat machine playing?
    if (isPlaying) {
      //set an interval to perform player logic
      const interval = setInterval(() => {
        //animate the playHead based on counter positionc
        playHeadLoop();
        // create an array of up to 6 sounds that are then played at the same time
        loop();
        // increments counter based on current tempo
        if (counter < 31) {
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

  //Map each instrumentRow onto the beat machine
  const instrumentRows = instruments.map((instrument, row) => {
    return (
      <InstrumentRow
        key={row}
        row={row}
        updateGrid={(row, column, toggle, color) => updateGrid(row, column, toggle, color)}
        instrumentName={instrument.name}
        instrumentSound={instrument.sound}
        pattern={instrument.pattern}
        instrumentColor={selectedColor}
      />
    );
  });

  //Conditionally Render Playhead if isPlaying
  const playHead = () => {
    if (isPlaying) {
      return (
        <>
          <td className="instrument" />
          {playHeadArray}
        </>
      );
    } else {
      return (
        <>
          <td className={isPlaying ? 'hidden' : 'instrument'} />
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>

          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>

          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>

          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
          <td className="inactive"></td>
        </>
      );
    }
  };

  //store playHeadComponent in a variable for readability
  const playHeadComponent = playHead();

  // Function when clicking 'Mint!'
  const create = () => {
    html2canvas(document.getElementById("table")).then(function (canvas) {
      var myImg = canvas.toDataURL("image/png");
      var pngBuffer = Buffer(myImg);
      const ipfsApi = require('ipfs-api');
      const ipfs = ipfsApi('ipfs.infura.io', 5001, { protocol: "https" })

      ipfs.files.add(pngBuffer, (err, result) => { // Upload buffer to IPFS

        if (err) {
          return "error";
        }
        var fileHash = `${result[0].hash}`;
        setHash(fileHash);
        openModal();
      });
    });
  }

  const reloadd = () => {
    window.loation = window.loacation
    window.location.reload();

  }
  // window.location = window.location;

  //App returns the composite of our beat machine and components
  return (
    <Fragment>
      <div className="container">
        <div className="titleImg">
        </div>
        <div className="progress_container_purple">
          <Button onClick={togglePlay} isPlaying={isPlaying} className="btn_play_circle_purple" >
            <img src={playbutton}></img>
          </Button>
          <Button onClick={togglePlay} isPlaying={isPlaying} className="btn_play_circle_purple" >
            <img src={stopbutton}></img>
          </Button>
        </div>
        <div className="musicplay">{playHeadComponent}</div>
        <div className="mint">
          <Button
            style={{ background: "ffffff", padding: '27px' }}
            onClick={create}>Mint!
          </Button>
          <Modal open={modalOpen} close={closeModal} header="" arr={arr1} hash={hash}>
          </Modal>
        </div>
        <br />
        <div className="volTempo" >
          <Button className="reloadicon" onClick={reloadd}><img  src={reload} /></Button>
          <Tempo value={tempo} onTempoChange={(event) => { handleTempoChange(event); }} >
            <img className="volTempo2" src={bpmbutton}></img>
          </Tempo>
        </div>
        <div className="colorpick">
          <ColorPicker color={selectedColor}
            // onChangeComplete={changeColor} 
            onSetColor={setColor} />
        </div>
        <br />
        <table border="2" className="tabledgn">
          <tbody id="table" ref={panelRef}>
            {instrumentRows}
          </tbody>
        </table>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;

