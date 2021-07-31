import React from 'react';
import { Link } from "react-router-dom";
import "../styles/smodal.css";
import { useCurrentUser } from "../hooks/current-user"
import { useProfile } from "../hooks/profile"

const Modal2 = (props) => {
    const cu = useCurrentUser();
    const profile = useProfile(cu.addr)
    const { open, close, header } = props;

    if (cu.addr) {
        return (
            <div className={open ? 'openModal modal2' : 'modal2'}>
                {open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}> &times; </button>
                        </header>
                        <main>
                            <p className="profileName">{profile.name}</p>
                            <p style={{marginBottom: 25}}><Link to="/profile" className="editProfile">Edit profile</Link></p> 
                            <p><Link to="/collection2" className="editProfile">My collection</Link></p>
                        </main>
                        <footer>
                        </footer>
                    </section>
                ) : null}
            </div>
        )
    } else {
        return (
            <div className={open ? 'openModal modal2' : 'modal2'}>
                {open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}> &times; </button>
                        </header>
                        <main>
                            <p style={{fontSize: 35, fontFamily: 'SpaceMono', marginBottom: 10}}>LOGIN FIRST!</p>
                            <p style={{fontSize: 20, fontFamily: 'SpaceMono'}}>You can play your collection after logging in.</p>
                        </main>
                        <footer>
                        </footer>
                    </section>
                ) : null}
            </div>
        )
    }

}
export default Modal2
