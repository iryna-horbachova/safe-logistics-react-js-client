import React from 'react'
import {Link, useHistory} from "react-router-dom";
import credentials from "../../constants/constants";
import {SubmitButton} from "../reusable/Button";
//import i18n from "../../i18n";
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const history = useHistory();
    const { t, i18n } = useTranslation();

    const logout = e => {
        e.preventDefault()

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/users/logout/", requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                if (jsonData.error != null) {
                    alert(jsonData.error);
                } else {
                    history.push('/sign-in')
                }
            })
            .catch((error) => {
                console.log("error")
                console.error(error);
            })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Safe logistics</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/drivers"} className="nav-link">{t("Drivers")}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/routes"} className="nav-link">{t("Routes")}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/designated-routes"} className="nav-link">{t("DesignatedRoutes")}</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/profile"} className="nav-link">{t("Profile")}</Link>
                    </li>
                    <li className="nav-item">
                        <form onSubmit={logout}>
                            <SubmitButton
                                className="btn"
                                label={t("Logout")}
                            />
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;