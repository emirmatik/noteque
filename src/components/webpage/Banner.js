import React from "react";
import bannerSVG from "./imgs/banner.svg"
import { Link } from "react-router-dom";

function Banner() {
    return (
        <div id="banner">
            <div className="banner-text">
                <h1>Note <span id="special-word">Everything.</span></h1>
                <p>Infinite personality is just one touch away </p>
                <Link to="/signup" className="banner-btn">Create Account</Link>
            </div>
            <div className="banner-svg">
                <img src={bannerSVG} alt="banner-svg" />
            </div>
        </div>
    )
}

export default Banner;