/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../styles/index.css';
import bpmbutton from "../img/btn_tempo_circle_purple.png"

const Tempo = (props) => {
  return (
    <div>
      <img src={bpmbutton}></img>
      <input
        className="tempoBorder"
        label='Tempo'
        type='number'
        min='40'
        max='240'
        value={props.value}
        onChange={props.onTempoChange}
      />
    </div>
  )
}

export default Tempo;