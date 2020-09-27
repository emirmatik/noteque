import React from "react";
import Navbar from "../components/webpage/Navbar"
import Banner from "../components/webpage/Banner"
import About from "../components/webpage/About"
import Footer from "../components/webpage/Footer"


function Webpage() {
    return (
        <>
            <Navbar />
            <Banner />
            <About />
            <Footer />
            <div id="edge-shape"></div>
        </>
    )
}

export default Webpage;