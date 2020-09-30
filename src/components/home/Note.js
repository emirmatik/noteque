import React from "react";
import { deleteNote, pinNote } from "../../fetch"
import { motion } from "framer-motion";
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { myContext } from "../../context"

// some styling
const flexDiv = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const pinIconStyle = (note) => {
    if (note.isPinned) return { color: "tomato" }
    else return { color: "black" }
}

function Note({ note }) {

    const { user, changeElement, searchedNotes } = React.useContext(myContext)

    const deleteSelectedNote = async () => {
        const newNotes = await deleteNote({ userID: user._id, noteID: note._id });
        changeElement({ notes: newNotes })
    }

    // pin the note
    const pin = async (note) => {
        const newNotes = await pinNote({ userID: user._id, noteID: note._id })
        if (searchedNotes) note.isPinned = !note.isPinned;
        changeElement({ notes: newNotes })
    }

    return (
        <motion.div layoutId={note._id} layout onClick={(e) => !e.target.classList.contains("icon") && changeElement({ popupNote: note })} key={note._id} className="note">
            {note.title && (<motion.div>
                <div style={flexDiv}>
                    <motion.h3 className="note-title">{note.title.length > 12 ? note.title.slice(0, 12) + "..." : note.title}</motion.h3>
                    <AttachFileIcon className="icon" id="pin-icon" onClick={() => pin(note)} style={pinIconStyle(note)} />
                </div>
                <motion.hr style={{ width: `${note.title.length * 12}px` }} className="note-title-underline" /></motion.div>
            )}
            <motion.p className="note-desc">{note.desc.length > 20 ? note.desc.slice(0, 20) + "..." : note.desc}</motion.p>
            <div className="card-bottom">
                <motion.p className="note-date">{new Date(note.createdAt).toLocaleDateString()}</motion.p>
                <DeleteIcon className="icon" id="delete-icon" onClick={deleteSelectedNote} />
            </div>
        </motion.div>
    )
}

export default Note;
