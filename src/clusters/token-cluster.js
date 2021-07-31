import React from "react";
/* import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"
import {useCurrentUser} from '../hooks/current-user' */

export function TokenCluster({addresss, address}) {
  /* const [nftInfo, setNftInfo] = useState(null)
  const cu = useCurrentUser()
  useEffect(() => {
    const fetchTokenData = async () => {
      const encoded = await fcl
        .send([
          fcl.script`
          import Monday from 0xdb16a5e14c410280
  
          pub fun main(addresss: Address, address: String): [AnyStruct] {
            let nftOwner = getAccount(addresss)  
            let capability = nftOwner.getCapability<&{Monday.NFTReceiver}>(/public/MondayReceiver)
            let receiverRef = capability.borrow()
                ?? panic("Could not borrow the receiver reference")
            return receiverRef.getMetadata(address: address)
          }
        `,
        fcl.args([fcl.arg(addresss, t.Address), fcl.arg(address, t.String)]),
        ])
      
      const decoded = await fcl.decode(encoded)
      setNftInfo(decoded) 
    };
    fetchTokenData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cu.addr]) */

  return (
    <div style={{fontSize: 40, fontFamily: 'SpaceMono', margin: '63px 30px 60px 330px'}}>Coming soon!
      {/* {
        nftInfo &&
        <div>
            {Object.keys(nftInfo).map(k => {
              return (
                <p>
                  NFT #{k} > Name: {nftInfo[k].name} / Color: {nftInfo[k].color}
                </p>
              )
            })
            }
        </div>
      } */}
    </div>
  );
}