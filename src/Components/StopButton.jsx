/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/index.css';
import stopbutton from "../img/btn_stop_circle_purple.png"

const StopButton = (props) => {
  return (
    <>
      <Button className="stopbutton"
        onClick={props.onClick}><img src={stopbutton} /></Button>
    </>
  )
}

export default StopButton;