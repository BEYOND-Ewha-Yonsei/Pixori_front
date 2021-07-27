
import {BrowserRouter as Router,Redirect,Route,Switch} from "react-router-dom";
import Home from "../Routes/Home";
import Collection from "../Routes/Collection"
import Collections from "../Routes/Collections"
import Editprofile from "../Routes/Editprofile"
import Maker from "../Routes/Maker";
import Menubar from "./Menubar";
import Footer from "./Footer";
import profileicon from "../img/ic_purple.svg"
import Modal2 from '../Components/Modal2';
import {InitCluster} from "../clusters/init-cluster"
import {ProfileCluster} from '../clusters/profile-cluster'
import React, {  useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/home.css'
import {useCurrentUser} from "../hooks/current-user"

import "../config"
import {AuthCluster} from '../clusters/auth-cluster';
import {RecoilRoot} from "recoil"
import {CurrentUserSubscription} from "../hooks/current-user"
import { Button } from '@material-ui/core';

function Init() {

  const [ modalOpen, setModalOpen ] = useState(false);
  const openModal = () => {
    setModalOpen(true);
}
const closeModal = () => {
    setModalOpen(false);
}

  const cu = useCurrentUser()

  return (
    <div>

    <Button  onClick={openModal} className="profileicon" >
    <img src={profileicon} ></img>
   </Button>
   <Modal2 open={ modalOpen } close={ closeModal } header="" address={cu.addr}  >
      </Modal2></div>
  )
}


export default ()=>(


    <Router>
       <>

      <Menubar />
      <AuthCluster className="auth"/>
      <CurrentUserSubscription />
      <Init />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/maker" component={Maker} />
        <Route path="/collection" component={Collection} />
        <Route path="/collection2" component={Collections} />
        <Route path="/profile" component={Editprofile} />
        <Redirect from="*" to="/" />
        <Footer/>
      </Switch>
    </>
    </Router>
)