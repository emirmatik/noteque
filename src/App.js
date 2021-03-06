import React, { useEffect } from 'react';
import Webpage from "./pages/Webpage"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import LoadingPage from "./pages/LoadingPage"
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import './App.css';
import './components/home/home.css';
import './components/webpage/webpage.css';
import { myContext } from "./context";

function App() {
  const { user } = React.useContext(myContext)
  const history = useHistory();
  const location = useLocation();

  console.log(user)

  useEffect(() => {
    if (user && user !== "none") {
      history.push("/home")
    } else if (location.pathname === "/home") {
      history.push("/")
    }
  }, [user])

  return (
    <>
      {user == null ? < LoadingPage /> :
        <Switch>
          <Route path="/" component={Webpage} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
        </Switch>
      }
    </>
  );
}

export default App;
