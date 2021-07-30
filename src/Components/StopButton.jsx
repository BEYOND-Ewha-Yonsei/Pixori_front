import React from 'react';
import '../styles/index.css';

import { Button, makeStyles } from '@material-ui/core';
import stopbutton from "../img/btn_stop_circle_purple.png"



const StopButton = (props) => {


    return(
      <>
           <Button className="stopbutton"
        
           onClick={props.onClick}><img src={stopbutton}/></Button>
      </>
    )
  }

export default StopButton;