import React, { useEffect, useState } from "react";
import { deleteNote, updateNote, pinNote } from "../../fetch"
import { AnimatePresence, motion } from "framer-motion";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { myContext } from "../../context";

const pinIconStyle = (note) => {
    if (note.isPinned) return { color: "tomato" }
    else return { color: "black" }
}

const flexDiv = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "100%"
}

function PopupNote() {

    const { user, popupNote, changeElement } = React.useContext(myContext)
    const [popupNoteTitle, setPopupNoteTitle] = useState("");
    const [popupNoteDesc, setPopupNoteDesc] = useState("");

    useEffect(() => {
        setPopupNoteTitle(popupNote && popupNote.title)
        setPopupNoteDesc(popupNote && popupNote.desc)
    }, [popupNote])


    const buttonDisabled = () => {
        return popupNote && popupNote.title === popupNoteTitle && popupNote.desc === popupNoteDesc ? true : false;
    }

    const deletePopupNote = async (e) => {
        e.preventDefault()
        const newNotes = await deleteNote({ userID: user._id, noteID: popupNote._id });
        changeElement({ popupNote: null });
        changeElement({ notes: newNotes });
    }

    const updateSelectedNote = async (e) => {
        e.preventDefault();
        const title = e.target.parentElement.parentElement.parentElement.querySelector("#popup-note-title")
        const desc = e.target.parentElement.parentElement.parentElement.querySelector("#popup-note-desc")
        const newNotes = await updateNote({ userID: user._id, noteID: popupNote._id, title: title.value, desc: desc.value })
        changeElement({ popupNote: null });
        changeElement({ notes: newNotes });
    }

    const pin = async (note) => {
        const newNotes = await pinNote({ userID: user._id, noteID: note._id })
        changeElement({ popupNote: null });
        changeElement({ notes: newNotes });
    }

    return (
        <AnimatePresence>
            {popupNote && (
                <motion.div className="add-note-form-bg">
                    <motion.form layoutId={popupNote._id} className="popup-note">
                        <ArrowBackIcon
                            style={{ marginBottom: "1rem", cursor: "pointer" }}
                            onClick={() => changeElement({ popupNote: null })} />
                        <div style={flexDiv}>
                            <motion.input
                                onChange={(e) => setPopupNoteTitle(e.target.value)}
                                type="text" defaultValue={popupNote.title}
                                placeholder={!popupNote.title ? "Title" : ""}
                                id="popup-note-title" />
                            <AttachFileIcon className="icon popup-note-pin" id="pin-icon" onClick={() => pin(popupNote)} style={pinIconStyle(popupNote)} />
                        </div>
                        <motion.hr className="note-title-underline popup-note-underline" />
                        <motion.textarea onChange={(e) => setPopupNoteDesc(e.target.value)} defaultValue={popupNote.desc} id="popup-note-desc"></motion.textarea>

                        <motion.div className="buttons">
                            <motion.button
                                onClick={updateSelectedNote}
                                disabled={buttonDisabled()}
                                className={!buttonDisabled() ? "save-btn" : "save-btn disabled-btn"}>Save</motion.button>
                            <motion.button onClick={deletePopupNote} id="delete-btn">Delete</motion.button>
                        </motion.div>
                        <div>
                            <motion.p id="popup-note-date"><span>Created: </span>{new Date(popupNote.createdAt).toLocaleString()}</motion.p>
                            {popupNote.updatedAt !== popupNote.createdAt && <motion.p id="popup-note-date"><span>Last Updated: </span>{new Date(popupNote.updatedAt).toLocaleString()}</motion.p>}
                        </div>

                    </motion.form>
                </motion.div>
            )
            }
        </AnimatePresence >
    )
}

export default PopupNote;