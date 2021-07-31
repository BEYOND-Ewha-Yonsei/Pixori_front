import React, { useEffect } from "react"
import { useCurrentUser } from "../hooks/current-user"
import { useInit } from "../hooks/init"
import '../styles/home.css';

export function InitCluster({ address }) {

  const init = useInit(address)
  const cu = useCurrentUser()
  //useEffect(() => init.check(), [address])

  useEffect(() => {
    async function refetch() {
      init.check();
    }
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  if (address == null) return null
  return (
    <div className="initCluster">
      <ul>
        <li>
          {!init.profile && cu.addr === address && init.isIdle && (
            <button className="initButton" disabled={init.isProcessing} onClick={init.exec}>
              Initialize account
            </button>
          )}
          {init.isProcessing && <span>PROCESSING</span>}
        </li>
      </ul>
    </div>
  )
}
