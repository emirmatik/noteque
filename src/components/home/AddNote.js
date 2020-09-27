import React, { useState } from "react";
import { postNote } from "../../fetch";
import CloseIcon from '@material-ui/icons/Close';
import { motion } from "framer-motion";
import { myContext } from "../../context";

const closeStyle = {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    cursor: "pointer"
}

function AddNote() {

    const [formValues, setFormValues] = useState({
        title: null,
        desc: "",
    })
    const { user, openNewNote, changeElement } = React.useContext(myContext)
    const [error, setError] = useState(null)

    const errorText = () => {
        setTimeout(() => {
            setError(null)
        }, 2500)
        return <p id="error">{error && error}</p>
    }

    const changeValue = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const capturePaste = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.clipboardData.getData('text/plain') })
    }

    const addNewNote = async (e) => {
        e.preventDefault({
            title: null,
            desc: ""
        });
        const form = e.target;
        const newNotes = await postNote({ id: user._id, note: formValues });
        if (!newNotes.error) {
            setFormValues()
            form.reset();
            changeElement({ notes: newNotes });
            changeElement({ openNewNote: false });
        } else {
            setError(newNotes.error)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="add-note-form-bg"
            style={{ display: openNewNote ? "flex" : "none" }}>
            <motion.form
                onSubmit={addNewNote}
                layout
                className="add-note-form">
                <h1>New Note</h1>
                <CloseIcon onClick={() => changeElement({ openNewNote: !openNewNote })} style={closeStyle} />
                <div>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" id="title" onChange={changeValue} onPaste={capturePaste} />
                    <label style={{ marginTop: "1rem" }} htmlFor="title">Body</label>
                    <textarea name="desc" style={{ border: error && "1px solid tomato" }} onChange={changeValue} onPaste={capturePaste} id="desc"></textarea>
                    {error && errorText()}
                    <button id="add-btn" type="submit">Add</button>
                </div>
            </motion.form>
        </motion.div>

    )
}

export default AddNote;