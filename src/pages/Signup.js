import React, { useState } from "react";
import signupSVG from "../components/webpage/imgs/signup.svg"
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { getUser, createUser } from "../fetch"
import { myContext } from "../context";

function Signup() {

    const { setUser } = React.useContext(myContext)

    const history = useHistory();

    const [formValues, setFormValues] = useState({
        username: null,
        email: null,
        password: null,
        passwordControl: null,
    })
    const [error, setError] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const body = { username: formValues.username, email: formValues.email, password: formValues.password };
        const result = await createUser(body);
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
    }

    const disabledButton = () => {
        return formValues.username && formValues.email && formValues.password && formValues.passwordControl && formValues.passwordControl === formValues.password ? false : true
    }

    const errorText = () => {
        setTimeout(() => {
            setError(null)
        }, 2500)
        return <p id="sign-error">{error && error}</p>
    }

    return (
        <div className="signup-container">
            <div className="baloon baloon1"></div>
            <div className="baloon baloon2"></div>
            <div className="baloon baloon3"></div>
            <div className="baloon baloon4"></div>
            <div className="signup-div">
                <Link id="back-to-home" to="/"><ArrowBackIcon style={{ marginRight: ".5rem" }} /> Back to Home</Link>
                <div className="signup-svg">
                    <img src={signupSVG} alt="signup-svg" />
                </div>
                <form className="signup-form" onSubmit={submitForm}>
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label><PersonIcon style={{ marginRight: ".5rem" }} /> Username *</label>
                        <input type="text" name="username" onChange={changeValue} />
                    </div>
                    <div className="form-group">
                        <label><EmailIcon style={{ marginRight: ".5rem" }} /> Email *</label>
                        <input type="email" name="email" onChange={changeValue} />
                    </div>
                    <div className="form-group">
                        <label><LockIcon style={{ marginRight: ".5rem" }} /> Password *</label>
                        <input type="password" name="password" onChange={changeValue} />
                    </div>
                    <div className="form-group">
                        <label><LockIcon style={{ marginRight: ".5rem" }} /> Password Again</label>
                        <input type="password" name="passwordControl" onChange={changeValue} />
                    </div>
                    <p style={{ margin: "2rem 0" }}>You already have an account ? <Link style={{ color: "blue" }} to="/login">Login</Link></p>
                    {error && errorText()}
                    <button disabled={disabledButton()} className={disabledButton() ? "signup-btn disabled-sign-btn" : "signup-btn"} type="submit">Sign Up</button>
                </form>
            </div>
        </div>

    )
}

export default Signup;