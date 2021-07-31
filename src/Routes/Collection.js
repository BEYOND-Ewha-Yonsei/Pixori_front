import React from 'react';
import { TokenCluster } from '../clusters/token-cluster'
import { ErrorTokenCluster } from '../clusters/error-token-cluster'
import { useCurrentUser } from '../hooks/current-user'
import Footer from "../Components/Footer.js"
import { Fragment } from 'react';

export default () => {
  function Token() {
    const cu = useCurrentUser()

    if (cu.addr) {
      return (
        <div className="Token">
          <TokenCluster addresss={"0xdb16a5e14c410280"} address={cu.addr} />
        </div>
      )
    }
    else {
      return (
        <div style={{fontSize: 40, fontFamily: 'SpaceMono', margin: '63px 30px 60px 330px'}}> Coming soon!</div>
      )
    }
  }

  return (
    <Fragment>
      <div>
        <Token />
      </div>
      <Footer />
    </Fragment>
  );
}