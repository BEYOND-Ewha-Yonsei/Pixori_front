import React,{useState} from 'react';
// import "../styles/modal2.css";
import { Button } from '@material-ui/core';
import {useCurrentUser} from "../hooks/current-user"
import {MintCluster} from '../clusters/mint-cluster'
import {InitCluster} from "../clusters/init-cluster"
import {ProfileCluster} from '../clusters/profile-cluster'
import {CurrentUserSubscription} from "../hooks/current-user"
const Modal2 = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const cu = useCurrentUser();
    const { open, close, header, address} = props;

    const [nftName, setNftName] = useState("initial value")
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
                        <CurrentUserSubscription />
                        <InitCluster address={address}/>
                        <ProfileCluster address={address}/>

                        
                    </main>
                    <footer>
               
                    
                    </footer>
                </section>
            ) : null }
        </div>
    )
}
export default Modal2