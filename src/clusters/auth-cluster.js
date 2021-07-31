import React, { Fragment } from "react"
import { useCurrentUser } from "../hooks/current-user"
import '../styles/home.css';

function WithAuth() {
  const cu = useCurrentUser()
  
  return !cu.loggedIn ? null : (
    <div>
      <button className="logout" onClick={cu.logOut}>Log out</button>
    </div>
  )
}

function SansAuth() {
  const cu = useCurrentUser()

  return cu.loggedIn ? null : (
    <Fragment >
      <button className="login" onClick={cu.logIn}>Login</button>
      <button className="Signrectangle" onClick={cu.signUp}>Sign Up</button>
    </Fragment>
  )
}

export function AuthCluster() {
  return (
    <>
      <WithAuth />
      <SansAuth />
    </>
  )
}