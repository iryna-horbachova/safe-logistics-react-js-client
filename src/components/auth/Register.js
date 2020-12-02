import React, { useState } from "react";
import './Auth.css'
import { FormInput } from "../reusable/FormInput";
import { SubmitButton } from "../reusable/Button";
import {Link, useHistory} from "react-router-dom";
import credentials from "../../constants/constants";
import {useTranslation} from "react-i18next";

const Register = () => {

    const { t, i18n } = useTranslation();
    const history = useHistory();

    const [user, setUser] = useState({
        data: {
            email: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            company: '',
        }
    });

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
    });

    const { email, password, confirm_password, first_name, last_name, company } = user.data;
    const { emailError, passwordError} = error;

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
        console.log("user")
        console.log(user.data)
        //const isValid = validateInputs(user.data, setError);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password, confirm_password: confirm_password,
                                        first_name: first_name, last_name: last_name, company: company})
        };
        fetch('http://127.0.0.1:8000/users/register/manager', requestOptions)
            .then(response => response.json())
            .then((jsonData) => {
                credentials.token = jsonData.token
                Object.freeze(credentials)
                history.push('/drivers')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={registerUser}>
                    <h3>{t("Register")}</h3>
                    <div className="form-group">
                        <FormInput
                            type="text"
                            onChange={onChange}
                            name="first_name"
                            placeholder=""
                            label={t("First name")}
                            className="form-control"
                            value={first_name}
                            error=""
                        />
                    </div>
                    <div className="form-group">
                        <FormInput
                            type="text"
                            onChange={onChange}
                            name="last_name"
                            placeholder=""
                            label={t("Last name")}
                            className="form-control"
                            value={last_name}
                            error=""
                        />
                    </div>
                    <div className="form-group">
                        <FormInput
                            type="text"
                            onChange={onChange}
                            name="company"
                            placeholder=""
                            label={t("Company")}
                            className="form-control"
                            value={company}
                            error=""
                        />
                    </div>
                    <div className="form-group">
                        <FormInput
                            type="text"
                            onChange={onChange}
                            name="email"
                            placeholder=""
                            label={t("Email")}
                            className="form-control"
                            value={email}
                            error={emailError}
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
                    <div className="form-group">
                        <FormInput
                            type="password"
                            onChange={onChange}
                            name="confirm_password"
                            placeholder=""
                            label={t("Confirm password")}
                            className="form-control"
                            value={confirm_password}
                            error={passwordError}
                        />
                    </div>
                    <SubmitButton
                        type="submit"
                        label={t("Submit")}
                        className="btn btn-primary btn-block"
                    />
                    <p className="forgot-password text-right">
                        {t("Already have an account?")} <Link to={"/sign-in"}>{t("Login")}</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Register;