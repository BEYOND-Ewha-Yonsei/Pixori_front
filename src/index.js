import React, {  useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/home.css'
import App from './Components/App';

import "./config"
import {AuthCluster} from './clusters/auth-cluster';
import {RecoilRoot} from "recoil"
import {CurrentUserSubscription} from "./hooks/current-user"
import { Button } from '@material-ui/core';
import {InitCluster} from "./clusters/init-cluster"
import {ProfileCluster} from './clusters/profile-cluster'
import {useCurrentUser} from "./hooks/current-user"
import { Fragment } from 'react';
import profileicon from "./img/ic_purple.svg"
import Modal2 from './Components/Modal2';

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
   <Modal2 open={ modalOpen } close={ closeModal } header="" >
      </Modal2></div>
  )
}

function Profile() {
  const cu = useCurrentUser()
  return (
    <ProfileCluster address={cu.addr} />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <AuthCluster className="auth"/>
      <CurrentUserSubscription />
      <Init />
      <Profile />
      <App />
    </RecoilRoot>
  </React.StrictMode>, document.getElementById('root'));