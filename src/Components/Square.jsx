import React, { useState } from 'react';
import { Howl, Howler } from 'howler';
import '../styles/index.css';
import { getBassNote } from '../helpers/instruments'

const arr1 = Array.from(Array(16), () => new Array(32).fill(0));

const Square = (props) => {
  const { selectedColor } = props.color;
  const [pixelColor, setPixelColor] = useState("#000000");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
    if (!toggle) {
      let sound = new Howl({
        src: [(props.name === 'Bassline') ? getBassNote(props.column) : props.sound],
        html5: true,
      });
      sound.play();
      Howler.volume(1);
    }
    setPixelColor(props.color);
    setCanChangeColor(false);

    // need to pass row, col, toggle back up to the grid in App.js
    props.updateGrid(props.row, props.column, !toggle, props.color);
    arr1[props.row].splice(props.column, 1, props.color)
  }

  function resetColor() {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }
    setCanChangeColor(true);
  }

  function changeColorOnHover() {
    setOldColor(pixelColor);
    setPixelColor(selectedColor);
  }

  //TODO: Move in-line styles out of components
  return (
    <React.Fragment>
      <td className="tCell"
        style={toggle ? { background: pixelColor, padding: '15px' } : { border: '0.01px solid rgba(132, 108, 255, 0.5)', background: '#fffff7', padding: '15px' }}
        onClick={() => { handleClick(); }}
        onMouseEnter={changeColorOnHover}
        onMouseLeave={resetColor} />
    </React.Fragment>
  )
}

export default Square;