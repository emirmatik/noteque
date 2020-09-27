import React from "react";
import { AnimateSharedLayout } from "framer-motion";
import PopupNote from "./PopupNote";
import Note from "./Note";
import { myContext } from "../../context";

// some styling
const notesDivStle = {
    marginTop: "2rem",
    position: "relative"
}

function Notes() {
    const { notes } = React.useContext(myContext)

    return (
        <div style={notesDivStle}>
            <AnimateSharedLayout type="switch">
                <div className="notes-div-header-div">
                    <header id="notes-div-header">Notes</header>
                </div>
                <div className="notes">
                    {notes.length < 1 ? <p className="no-notes-text">Hey take some <span>notes</span> ! You don't have any :/</p> : notes.filter(n => !n.isPinned).map(note => (
                        <Note key={note._id} note={note} />
                    ))}
                </div>
                <PopupNote />
            </AnimateSharedLayout>
        </div>
    )
}

export default Notes;