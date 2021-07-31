/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react'
import '../styles/home.css'
import Cherry from "../img/Vector@3x.png"
import Footer from "../Components/Footer.js"

function Maker() {
    return (
        <Fragment>
            <div className="Rectangle-491">
                <div className="font">  Make your own artwork and song at the same time
                    via easy, hands-on experiments.
                </div>
                <div className="Rectangle-492"> LET’S Start</div>
            </div>
            <div className="What-is-Pixori">What is Pixori?</div>
            <div>
                <img src={Cherry} className="grid" />
                <div className="Frame-1">Create your own NFTs</div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Maker