import React from 'react';
import './Table.css';
import {Link, useHistory} from "react-router-dom";
import {SubmitButton} from "../reusable/Button";
import credentials from "../../constants/constants";
import {useTranslation} from "react-i18next";

const TABLE_HEAD = [
    'id',
    'Title',
    'Priority',
    'Load type',
    'Load quantity',
    'Start location',
    'End location',
    'Min experience',
    'Min health',
    'Distance',
    'Status',
]

const PRIORITIES = {
    'H': 'High',
    'S': 'Standard',
    'L': 'Low',
}

const LOADS = {
    'P': 'Passenger',
    'C': 'Cargo'
}

const RoutesTable = props => {

    const { t, i18n } = useTranslation();
    const history = useHistory();
    const { elements } = props;

    const designateRoutes = e => {
        e.preventDefault()
        console.log("DESIGNATE ROUTEs")

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/assignment/designate/", requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                alert("Routes successfully designated")
            })
            .catch((error) => {
                alert("Route successfully designateds")
                console.log("error")
                console.error(error);
            })
    }

    const deleteRoute = e => {
        e.preventDefault()

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/routes/" + e.target.id, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                alert("Route successfuly deleted!")

             })
            .catch((error) => {
                alert("Route successfuly deleted!")
                console.log("error")
            })
    }

    return(
        <div>
            <h1>{t("Routes")}</h1>
            <h5><Link to={"/route/0"}>{t("Add route")}</Link></h5>
            <form onSubmit={designateRoutes}>
                <SubmitButton
                    className="btn btn-primary"
                    label={t("Designate current routes")}
                />
            </form>
            <div className="col-sm-12 table-responsive">
                <table className="table table-centered mb-0" id="ticketTable">
                    <thead className="font-14 bg-light">
                        <tr>
                            {
                                TABLE_HEAD.map((tableHead, i) =>
                                    <th
                                        key={i}
                                        className="font-weight-medium"
                                    >
                                        {t(tableHead)}
                                    </th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        elements.map(element =>
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.title}</td>
                                <td>{PRIORITIES[element.priority]}</td>
                                <td>{LOADS[element.load_type]}</td>
                                <td>{element.load_quantity}</td>
                                <td>{element.start_location}</td>
                                <td>{element.end_location}</td>
                                <td>{element.min_experience}</td>
                                <td>{element.min_health}</td>
                                <td>{element.distance}</td>
                                <td>
                                    {
                                        element.is_in_progress ?
                                            <button type="button" className="btn btn-warning">{t("In progress")}</button> :
                                            <Link to={"/priorities/" + element.id}>
                                                <button type="button" className="btn btn-success">{t("Assign driver")}</button>
                                            </Link>
                                    }
                                </td>

                                <td>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-primary">{t("Edit")}</button>
                                        <form onSubmit={deleteRoute} id={element.id}>
                                            <SubmitButton
                                                className="btn btn-danger"
                                                label={t("Delete")}
                                            />
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default RoutesTable;