import React from 'react';
import './Table.css';
import {Link, useHistory} from "react-router-dom";
import {SubmitButton} from "../reusable/Button";
import credentials from "../../constants/constants";

const TABLE_HEAD = [
    'id',
    'Title',
    'Priority',
    'Load type',
    'Load Quantity',
    'Start location',
    'End location',
    'Min experience',
    'Min health',
    'Distance',
    'Status',
    'Actions'
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
                alert("Route successfully deleted")
            })
            .catch((error) => {
                alert("Route successfully deleted")
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
                console.log(jsonData)
                alert("Driver successfuly deleted!")

             })
            .catch((error) => {
                history.push('/routes')
                console.log("error")
                console.error(error);
            })
    }

    return(
        <div>
            <h1>Routes</h1>
            <h5><Link to={"/add-route"}>Add route</Link></h5>
            <form onSubmit={designateRoutes}>
                <SubmitButton
                    className="btn btn-primary"
                    label="Designate current routes"
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
                                        {tableHead}
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
                                            <button type="button" className="btn btn-warning">In progress</button> :
                                            <Link to={"/priorities/" + element.id}>
                                                <button type="button" className="btn btn-success">Assign driver</button>
                                            </Link>
                                    }
                                </td>

                                <td>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-primary">Edit</button>
                                        <form onSubmit={deleteRoute} id={element.id}>
                                            <SubmitButton
                                                className="btn btn-danger"
                                                label="Delete"
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