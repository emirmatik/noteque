import React, { useState } from "react";
import loginSVG from "../components/webpage/imgs/login.svg"
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { getUser, loginUser } from "../fetch"
import { myContext } from "../context";

function Login() {

    const { setUser } = React.useContext(myContext)

    const history = useHistory();

    const [formValues, setFormValues] = useState({
        email: null,
        password: null,
    })
    const [error, setError] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const body = { email: formValues.email, password: formValues.password };
        const result = await loginUser(body);
        if (result.error) return setError(result.error);
        else {
            localStorage.setItem("token", result);
            const user = await getUser(result)
            form.reset();
            setUser(user)
            history.push("/home")
        }
        console.log(result);
    }

    const changeValue = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }

    const disabledButton = () => {
        return formValues.email && formValues.password ? false : true
    }

    const errorText = () => {
        setTimeout(() => {
            setError(null)
        }, 2500)
        return <p id="sign-error">{error && error}</p>
    }


    return (
        <div className="signup-container">
            <div className="baloon loginbaloon1"></div>
            <div className="baloon loginbaloon2"></div>
            <div className="baloon loginbaloon3"></div>
            <div className="baloon loginbaloon4"></div>
            <div className="signup-div">
                <Link id="back-to-home" to="/"><ArrowBackIcon style={{ marginRight: ".5rem" }} /> Back to Home</Link>
                <div className="signup-svg login-svg">
                    <img src={loginSVG} alt="login-svg" />
                </div>
                <form className="signup-form" onSubmit={submitForm}>
                    <h3>Login</h3>
                    <div className="form-group">
                        <label><EmailIcon style={{ marginRight: ".5rem" }} /> Email *</label>
                        <input type="email" name="email" onChange={changeValue} />
                    </div>
                    <div className="form-group">
                        <label><LockIcon style={{ marginRight: ".5rem" }} /> Password *</label>
                        <input type="password" name="password" onChange={changeValue} />
                    </div>
                    {error && errorText()}
                    <p style={{ margin: "2rem 0" }}>Do not have an account ? <Link style={{ color: "blue" }} to="/signup">Create one</Link></p>
                    <button disabled={disabledButton()} className={disabledButton() ? "signup-btn login-btn disabled-sign-btn" : "signup-btn login-btn"} type="submit">Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login;