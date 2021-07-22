import React, { useState } from 'react';
import "../styles/modal.css";
import { MintCluster } from "../clusters/mint-cluster"
import {useCurrentUser} from "../hooks/current-user"

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, colorArray } = props;
    const [nftName, setNftName] = useState("Enter your NFT's Name")
    const cu = useCurrentUser();

    function set() {
      setNftName(document.getElementById("input").value)
      console.log(nftName)
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <div>
                            <input value={nftName} className="MintInputRectangle" type="text" id="input" onChange={set}></input>
                        </div>
                        <div>
                        <MintCluster name={nftName} array={colorArray} address={cu.addr}/>
                        </div>
                        
                    </main>
                    <footer>
                        <button className="close" onClick={close}> close </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}
export default Modal