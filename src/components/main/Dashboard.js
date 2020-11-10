import React from 'react';
import {SubmitButton} from "../reusable/Button";
import Table from "../table/Table";
import AddDriver from "../drivers/AddDriver";


class Dashboard extends React.Component {
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
            <AddDriver/>
            <Table elements={ this.state.elements} fields={['user.first_name']}/>
        </div>

        )
    }
}

export default Dashboard;