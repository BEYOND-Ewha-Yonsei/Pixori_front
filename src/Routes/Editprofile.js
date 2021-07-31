import React, { Fragment } from 'react';
import { ProfileCluster } from '../clusters/profile-cluster'
import { useCurrentUser } from '../hooks/current-user'
import Footer from "../Components/Footer.js"
import '../styles/profile.css';

export default () => {
  const cu = useCurrentUser()
  return (
    <Fragment>
      <div className="edityourprofile">
        Edit your profile
      </div>
      <div className="Rectangle-1013">
        <div style={{float: 'left'}}>
        <div className="User-ID">User ID</div>
        <ProfileCluster address={cu.addr} />
        </div>
        <div style={{float: 'left'}}>
        <div className="User-ID">User Address</div>
        <p className="note">{cu.addr}</p>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

