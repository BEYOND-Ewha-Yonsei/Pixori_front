import React, {useEffect} from "react"
import {useCurrentUser} from "../hooks/current-user"
import {useInit} from "../hooks/init"

const fmtBool = bool => (bool ? "yes" : "no")

export function InitCluster({address}) {

const init = useInit(address)
const cu = useCurrentUser()
//useEffect(() => init.check(), [address])

useEffect(() => {
  async function refetch(){
    init.check();
  }
  refetch();
}, [address, init])

 if (address == null) return null
 return (
  <div className="Profile">
    <h3>My Address: {address}</h3>
    <ul>
      <li>
      <strong>Init Profile?: </strong>
         {init.isIdle && <span>{fmtBool(init.profile)}</span>}
         {!init.profile && cu.addr === address && init.isIdle && (
           <button className="UpdateProfile" disabled={init.isProcessing} onClick={init.exec}>
             Initialize
           </button>
         )}
        {init.isProcessing && <span>PROCESSING</span>}
       </li>
     </ul>
   </div>
)
}
