import React from "react";
import { getUser } from "./fetch/index";

const myContext = React.createContext(true);

class ContextProvider extends React.Component {

    state = {
        user: null,
        token: null,
        openNewNote: false,
        searchedNotes: null,
        popupNote: null,
        notes: []
    }

    async componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            this.setState({ token })
            const user = await getUser(token);
            this.setState({ user, notes: user.notes })
        } else {
            this.setState({ user: "none" })
        }
    }

    logout = () => {
        localStorage.removeItem("token");
        this.setState({ token: null, user: "none" })
    }

    // will be used to set the state
    changeElement = (element) => {
        this.setState(element)
    }


    render() {
        return (
            <myContext.Provider value={{ ...this.state, logout: this.logout, changeElement: this.changeElement }} >
                { this.props.children}
            </myContext.Provider >
        )
    }
}

const ContextConsumer = myContext.Consumer;

export { myContext, ContextProvider, ContextConsumer }
