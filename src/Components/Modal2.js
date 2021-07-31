import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/smodal.css";
import { useCurrentUser } from "../hooks/current-user"
import { InitCluster } from "../clusters/init-cluster"
import { fetchProfile } from "../flow/fetch-profile.script"

const Modal2 = (props) => {
    const { open, close, header } = props;
    const cu = useCurrentUser();
    const [profile, setProfile] = useState("Your Name")

    useEffect(() => {
            async function refetch() {
                await fetchProfile(cu.addr)
                    .then(profile => {
                        if (profile == null) return profile
                        return profile
                    })
                    .then(setProfile)
            }
            refetch();
        })

    if (cu.addr) {
        if (profile) { // init 했으면 profile 생성. profile.name은 아직 없음
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
                                <p style={{ marginBottom: 25 }}><Link to="/profile" className="editProfile">Edit profile</Link></p>
                                <p><Link to="/collection2" className="editProfile">My collection</Link></p>
                                <button className="logOut" onClick={cu.logOut}>Log out</button>
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
                                <p className="note">You must initialize your account in order to set an ID.</p>
                                <InitCluster address={cu.addr} />
                            </main>
                            <footer>
                            </footer>
                        </section>
                    ) : null}
                </div>



            )
        }

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
                            <p style={{ fontSize: 35, fontFamily: 'SpaceMono', marginBottom: 10 }}>LOGIN FIRST!</p>
                            <p style={{ fontSize: 20, fontFamily: 'SpaceMono' }}>You can play your collection after logging in.</p>
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
