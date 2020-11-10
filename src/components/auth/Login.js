import React, { useState } from "react";
import './Auth.css'
import { FormInput } from "../reusable/FormInput";
import {SubmitButton} from "../reusable/Button";
import {Link} from "react-router-dom";
import {validateInputs} from "../../helpers/Helpers";

const Login = () => {
    const [user, setUser] = useState({
        data: {
            username: '',
            password: '',
        }
    });

    const [error, setError] = useState({
        usernameError: '',
        passwordError: '',
    });

    const { username, password } = user.data;
    const { usernameError, passwordError } = error;

    const onChange = e => {
        const { name, value } = e.target;
        const { data } = user;
        setUser({
            data: {
                ...data,
                [name]: value
            }
        });
    }
    const loginUser = e => {
        e.preventDefault();
        const isValid = validateInputs(user.data, setError);
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={ loginUser }>
                    <h3>Login</h3>
                    <div className="form-group">
                        <FormInput
                            type="text"
                            onChange={onChange}
                            name="username"
                            placeholder=""
                            label="Username"
                            className="form-control"
                            value={username}
                            error={usernameError}
                        />
                    </div>
                    <div className="form-group">
                        <FormInput
                            type="password"
                            onChange={onChange}
                            name="password"
                            placeholder=""
                            label="Password"
                            className="form-control"
                            value={password}
                            error={passwordError}
                        />
                    </div>
                    <SubmitButton
                        type="submit"
                        label="Submit"
                        className="btn btn-primary btn-block"
                    />
                    <p className="forgot-password text-right">
                        Don't have an account? <Link to={"/sign-up"}>Register</Link>
                    </p>
                </form>

            </div>
        </div>
    )
}

export default Login;