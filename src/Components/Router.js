/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Button } from '@material-ui/core';
import Home from "../Routes/Home";
import Collection from "../Routes/Collection"
import Collections from "../Routes/Collections"
import Editprofile from "../Routes/Editprofile"
import Maker from "../Routes/Maker";
import Menubar from "./Menubar";
import Footer from "./Footer";
import Modal2 from '../Components/Modal2';
import { useCurrentUser } from "../hooks/current-user"
import { AuthCluster } from '../clusters/auth-cluster';
import { CurrentUserSubscription } from "../hooks/current-user"
import '../styles/home.css'
import profileicon from "../img/ic_purple.svg"
import "../config"

function Init() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  const cu = useCurrentUser()
  if (cu.addr) {
    return (
      <div>
        <Button onClick={openModal} className="profileicon" >
          <img src={profileicon} ></img>
        </Button>
        <Modal2 open={modalOpen} close={closeModal} header="" address={cu.addr}  >
        </Modal2></div>
    )
  } else {
    return null
  }

}

export default () => (
  <Router>
    <>
      <Menubar />
      <AuthCluster className="auth" />
      <CurrentUserSubscription />
      <Init />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/maker" component={Maker} />
        <Route path="/collection" component={Collection} />
        <Route path="/collection2" component={Collections} />
        <Route path="/profile" component={Editprofile} />
        <Redirect from="*" to="/" />
        <Footer />
      </Switch>
    </>
  </Router>
)