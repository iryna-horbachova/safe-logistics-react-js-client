import React from 'react';
import {SubmitButton} from "../reusable/Button";
import Table from "../table/Table";
import DriversTable from "../table/DriversTable";
import AddDriver from "./AddDriver";
import {Link} from "react-router-dom";

import credentials from "../../constants/constants";

class Drivers extends React.Component {
    constructor(props){
        super(props);
        this.state = {elements: []};
    }

    componentWillMount() {
        console.log("Credentials from drivers ")
        console.log(credentials.token)
        fetch(this.props.url)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log('Успех:', JSON.stringify(jsonData));
                console.log(jsonData)
                this.setState({ elements: jsonData })
                console.log(this.state.elements)
                console.log(this.props.elements)

         })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
        return(
        <div>
            <Link to={"/add-driver"}>Add driver</Link>
            <AddDriver/>
            <DriversTable elements={ this.state.elements} fields={['user.first_name']}/>

        </div>

        )
    }
}

export default Drivers;