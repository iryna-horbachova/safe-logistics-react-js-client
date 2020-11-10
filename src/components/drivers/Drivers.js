import React from 'react';
import {SubmitButton} from "../reusable/Button";
import Table from "../table/Table";
import DriversTable from "../table/DriversTable";
import AddDriver from "./AddDriver";
import {Link} from "react-router-dom";

class Drivers extends React.Component {
    constructor(props){
        super(props);
        this.state = {elements: []};
    }

    componentWillMount() {
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
            <SubmitButton
                type="submit"
                label="Add"
                className="btn btn-primary"
            />
            <Link to={"/add-driver"}>Add driver</Link>
            <AddDriver/>
            <DriversTable elements={ this.state.elements} fields={['user.first_name']}/>

        </div>

        )
    }
}

export default Drivers;