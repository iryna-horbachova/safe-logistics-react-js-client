import React from 'react';
import './Table.css';
import {Link, useHistory} from "react-router-dom";
import {SubmitButton} from "../reusable/Button";
import credentials from "../../constants/constants";
import {useTranslation} from "react-i18next";

const TABLE_HEAD = [
    'Route id',
    'Route title',
    'Driver id',
    'Driver name',
    'Current location',
    'Status',
]

const STATUS = {
    'N': 'Not started',
    'I': 'In progress',
    'F': 'Finished',
}

const DesignatedRoutesTable = props => {

    const { t, i18n } = useTranslation();
    const { elements } = props;
    const history = useHistory();

    const deleteDesignatedRoute = e => {
        e.preventDefault()

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/routes/designated/" + e.target.id, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                alert("Designated route successfuly deleted!")

             })
            .catch((error) => {
                alert("Designated route successfuly deleted!")
                history.push('/designated-routes')
                console.log("error")
                console.error(error);
            })
    }

    return(
        <div>
            <h1>{t("DesignatedRoutes")}</h1>
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
                                <td>{element.route.id}</td>
                                <td>{element.route.title}</td>
                                <td>{element.driver.user.id}</td>
                                <td>{element.driver.user.first_name} {element.driver.user.last_name}</td>
                                <td>{element.driver.current_location}</td>
                                <td>{STATUS[element.status]}</td>

                                <td>
                                    <div className="btn-group" role="group">
                                        <form onSubmit={deleteDesignatedRoute} id={element.id}>
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

export default DesignatedRoutesTable;