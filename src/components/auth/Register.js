import React, { useState } from "react";
import './Auth.css'
import { FormInput } from "../reusable/FormInput";
import {RadioInput} from "../reusable/RadioInput";
import { SubmitButton } from "../reusable/Button";
import { validateInputs } from "../../helpers/Helpers";
import {Link} from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        data: {
            username: '',
            password: '',
            role: ''
        }
    });

    const [error, setError] = useState({
        usernameError: '',
        passwordError: '',
        roleError: ''
    });

    const { username, password } = user.data;
    const { usernameError, passwordError, roleError } = error;

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
    const registerUser = e => {
        e.preventDefault();
        const isValid = validateInputs(user.data, setError);
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={registerUser}>
                    <h3>Register</h3>
                    <div className="form-group">
                        <FormInput
                            type="text"
                            onChange={onChange}
                            name="username"
                            placeholder="Enter username"
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
                            placeholder="Enter password"
                            label="Password"
                            className="form-control"
                            value={password}
                            error={passwordError}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label><br/>
                        <div className="form-check form-check-inline">
                            <RadioInput
                                id="inlineRadio1"
                                onChange={onChange}
                                name="role"
                                labelClassName="form-check-label"
                                className="form-check-input"
                                value="Manager"
                                error={roleError}
                             />
                             <RadioInput
                                id="inlineRadio2"
                                onChange={onChange}
                                name="role"
                                labelClassName="form-check-label"
                                className="form-check-input"
                                value="Driver"
                                error={roleError}
                             />
                        </div>
                    </div>
                    <SubmitButton
                        type="submit"
                        label="Submit"
                        className="btn btn-primary btn-block"
                    />
                    <p className="forgot-password text-right">
                        Already have an account? <Link to={"/sign-in"}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Register;