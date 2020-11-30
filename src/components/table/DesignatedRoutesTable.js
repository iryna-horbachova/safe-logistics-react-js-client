import React from 'react';
import './Table.css';
import {Link} from "react-router-dom";

const TABLE_HEAD = [
    'Route id',
    'Route Title',
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

    const { elements } = props;

    return(
        <div>
            <h1>Designated Routes</h1>
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
                                <td>{element.route.id}</td>
                                <td>{element.route.title}</td>
                                <td>{element.driver.user.id}</td>
                                <td>{element.driver.user.first_name} {element.driver.user.last_name}</td>
                                <td>{element.driver.current_location}</td>
                                <td>{STATUS[element.status]}</td>

                                <td>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-primary">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
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