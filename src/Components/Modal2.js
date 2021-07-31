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
                            <Link to="/profile" className="editProfile">Edit profile</Link>
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
                            <p>Login first!</p>
                            You can view your collection after logging in.
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
