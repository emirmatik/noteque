import React, { useEffect, useState } from "react"
import Navbar from "../components/home/Navbar";
import AddNote from "../components/home/AddNote";
import Notes from "../components/home/Notes";
import PinnedNotes from "../components/home/PinnedNotes";
import { myContext } from "../context";
import { CircularProgress } from '@material-ui/core';


function Home() {
    const { user, searchedNotes } = React.useContext(myContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) setLoading(false)
    }, [user])

    return (
        <>
            <Navbar />
            {loading ? <CircularProgress id="loading-icon" /> :
                <>
                    <AddNote />
                    <PinnedNotes />
                    {!searchedNotes && <Notes />}
                </>}
        </>
    )
}

export default Home;