import React from 'react';
import {ProfileCluster} from '../clusters/profile-cluster'
import {useCurrentUser} from '../hooks/current-user'
import Footer from "../Components/Footer.js"
import { Fragment } from 'react';
import '../styles/profile.css';
export default () => {
    const cu = useCurrentUser()

  return (
    <Fragment>
    <div  className="edityourprofile">
    Edit your profile
  
    </div>

    <div  className="Rectangle-1013">
    <div  className="User-ID">User ID</div>
    <ProfileCluster address={cu.addr}/>
  
    </div>
<Footer/>


</Fragment>
  );
}

