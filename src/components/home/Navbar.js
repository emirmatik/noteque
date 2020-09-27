import React from "react";
import AddIcon from '@material-ui/icons/Add';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { myContext } from "../../context";
import { useHistory } from "react-router-dom"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const iconStyle = {
    fontSize: "1.2rem",
    marginRight: ".5rem"
}

const notTouchable = {
    pointerEvents: "none"
}

function Navbar() {
    const { user, logout, openNewNote, changeElement } = React.useContext(myContext)
    const history = useHistory();

    function logOut() {
        logout();
        history.push("/");
    }

    return (
        <div className="navbar">
            {window.innerWidth > 700 && <h3 id="logo" style={notTouchable}><ReceiptIcon style={iconStyle} />Noteque</h3>}
            <div className="nav-links">
                <p style={notTouchable}>{user && user.username}</p>
                <button onClick={() => changeElement({ openNewNote: !openNewNote })} className="nav-link new-note-btn"><AddIcon style={iconStyle} />New Note</button>
                <button onClick={logOut} className="nav-link sign-btn"><ExitToAppIcon style={iconStyle} /> Logout</button>
            </div>
        </div>

    )
}

export default Navbar;