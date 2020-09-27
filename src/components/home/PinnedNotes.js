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

function PinnedNotes() {
    const { changeElement, notes, searchedNotes } = React.useContext(myContext)

    const searchNotes = (e) => {
        if (e.target.value.length > 0) changeElement({ searchedNotes: notes.filter(note => note.desc.toLowerCase().includes(e.target.value.toLowerCase())) })
        else changeElement({ searchedNotes: null })
    }

    return (
        <div style={notesDivStle}>
            <AnimateSharedLayout type="switch">
                <div className="notes-div-header-div">
                    <header id="notes-div-header">{!searchedNotes ? "Pinned" : "Search"}</header>
                    <input onChange={searchNotes} placeholder="Search" id="notes-search" type="text" />
                </div>
                <div className="notes">
                    {searchedNotes ? searchedNotes.map(note => (
                        <Note note={note} key={note._id} />
                    )) : notes.filter(note => note.isPinned).length < 1 ? <p className="no-pinned-notes-text">Empty</p> : notes.filter(n => n.isPinned).map(note => (
                        <Note note={note} key={note._id} />
                    ))}
                </div>
                <PopupNote />
            </AnimateSharedLayout>
        </div>
    )
}

export default PinnedNotes;



