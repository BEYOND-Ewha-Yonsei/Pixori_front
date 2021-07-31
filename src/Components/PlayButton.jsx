/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../styles/index.css';
import { Button, makeStyles } from '@material-ui/core';
import playbutton from "../img/btn_play_circle_purple.png"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const PlayButton = (props) => {
  const classes = useStyles();
  return (
    <div>
      {props.isPlaying ? (<Button
        variant="outlined"
        color="primary"
        className={classes.button}
        disabled={props.isPlaying}
        onClick={props.onClick}>Playing..</Button>) : (<Button
        className={classes.button}
        onClick={props.onClick}><img src={playbutton} /></Button>)}
    </div>
  )
}
export default PlayButton;