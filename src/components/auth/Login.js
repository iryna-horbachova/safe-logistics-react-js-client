import React, { useState } from "react";
import { FormInput } from "../reusable/FormInput";
import { SubmitButton } from "../reusable/Button";
import { Link, useHistory } from "react-router-dom";

import './Auth.css'
import {validateInputs} from "../../helpers/Helpers";
import credentials from "../../constants/constants";
import {useTranslation} from "react-i18next";

const Login = () => {

    const { t, i18n } = useTranslation();
    const history = useHistory();

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

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch('http://127.0.0.1:8000/users/login/', requestOptions)
            .then(response => response.json())
            .then((jsonData) => {
                console.log('Успех:', JSON.stringify(jsonData));
                console.log(jsonData)
                credentials.token = jsonData.token
                console.log("credentials token " + credentials.token)
                Object.freeze(credentials)
                history.push('/drivers')
                console.log("push")
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <div className="auth-wrapper">

            <div className="auth-inner">
                <form onSubmit={ loginUser }>
                    <h3>{t("Login")}</h3>
                    <div className="form-group">
                        <FormInput
                            type="text"
                            onChange={onChange}
                            name="username"
                            placeholder=""
                            label={t("Email")}
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
                            label={t("Password")}
                            className="form-control"
                            value={password}
                            error={passwordError}
                        />
                    </div>
                    <SubmitButton
                        type="submit"
                        label={t("Submit")}
                        className="btn btn-primary btn-block"
                    />
                    <p className="forgot-password text-right">
                        {t("Don't have an account?")} <Link to={"/sign-up"}>{t("Register")}</Link>
                    </p>
                </form>

            </div>
        </div>
    )
}

export default Login;