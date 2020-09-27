import React, { useEffect, useState } from "react";
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Link } from "react-router-dom";

const iconStyle = {
    fontSize: "1.2rem",
    marginRight: ".5rem"
}

function Navbar() {

    const [blackNav, setBlackNav] = useState(false);

    useEffect(() => {
        function scrollEvent() {
            console.log(window.scrollY)
            if (window.scrollY > 50) {
                setBlackNav(true)
            } else {
                setBlackNav(false)
            }
        }
        window.addEventListener("scroll", scrollEvent);
        return () => window.removeEventListener("scroll", scrollEvent)
    }, [])

    return (
        <div className={"navbar-div" + (blackNav ? " navbar-blackbg" : "")}>
            <div className="navbar website-navbar">
                <h3 id="logo"><ReceiptIcon style={iconStyle} />Noteque</h3>
                <div className="nav-links website-nav-links">
                    <a style={{ color: blackNav ? "#fdfdfd" : "black" }} onClick={() => window.scrollTo(0, 0)} className="nav-link">Home</a>
                    <a style={{ color: blackNav ? "#fdfdfd" : "black" }} href="#about" className="nav-link">About</a>
                    <Link to="/login" className="nav-link signin-btn">Login</Link>
                </div>
            </div>
        </div>

    )
}

export default Navbar;