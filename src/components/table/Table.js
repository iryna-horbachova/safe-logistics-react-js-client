import React from 'react';
import './Table.css';

const TABLE_HEAD = [
    'id',
    'Name',
    'Email',
    'Experience',
    'License type',
    'Car type',
    'Health state'
]

const Table = props => {

    const { elements, fields } = props;

    return(
        <div>
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
                                        <i className="fas fa-angle-down icon"></i>
                                    </th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                    Object.keys(elements).forEach(key => {
                            console.log(key, elements[key]);
                        })}
                    {


                        elements.map(element =>
                            <tr key={element.user.id}>
                                <td>{element.user.id}</td>
                                <td>{element.user.first_name} {element.user.last_name} </td>
                                <td>{element.user.email}</td>
                                <td>{element.experience}</td>
                                <td>{element.license_type}</td>
                                <td>{element.car_type}</td>
                                <td>{element.health_state}</td>

                                <td>
                                    <button type="button" className="btn btn-primary">Edit</button>
                                    <button type="button" className="btn btn-danger">Delete</button>
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

export default Table;