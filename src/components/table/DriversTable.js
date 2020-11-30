import React from 'react';
import './Table.css';
import {Link, useHistory} from "react-router-dom";
import {SubmitButton} from "../reusable/Button";
import credentials from "../../constants/constants";

const TABLE_HEAD = [
    'id',
    'Name',
    'Email',
    'Experience',
    'License type',
    'Car type',
    'Car max load',
    'Average speed per hour',
    'Pay for km',
    'Health state',
]

const LOADS = {
    'P': 'Passenger',
    'C': 'Cargo'
}

const DriversTable = props => {

    const history = useHistory();
    const { elements } = props;
    const deleteDriver = e => {
        e.preventDefault()

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/users/drivers/" + e.target.id, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                alert("Driver successfuly deleted!")

             })
            .catch((error) => {
                history.push('/drivers')
                console.log("error")
                console.error(error);
            })
    }

    return(
        <div>
            <h1>Drivers</h1>
            <h5><Link to={"/add-driver"}>Add driver</Link></h5>
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
                                        {tableHead} &nbsp;&nbsp;

                                    </th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        elements.map(element =>
                            <tr key={element.user.id}>
                                <td>{element.id}</td>
                                <td>{element.user.id}</td>
                                <td>{element.user.first_name} {element.user.last_name} </td>
                                <td>{element.user.email}</td>
                                <td>{element.experience}</td>
                                <td>{element.license_type}</td>
                                <td>{LOADS[element.car_type]}</td>
                                <td>{element.car_max_load}</td>
                                <td>{element.average_speed_per_hour}</td>
                                <td>{element.pay_for_km}</td>
                                <td>{element.health_state}</td>

                                <td>
                                    <div className="btn-group" role="group">
                                        <form onSubmit={deleteDriver} id={element.user.id}>

                                            <SubmitButton
                                                className="btn btn-primary"
                                                label="Edit"

                                            />
                                        </form>
                                        <form onSubmit={deleteDriver} id={element.user.id}>
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

export default DriversTable;