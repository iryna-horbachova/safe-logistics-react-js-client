import React from 'react';

import DriversTable from "../table/DriversTable";
import credentials from "../../constants/constants";


class Drivers extends React.Component {
    constructor(props){
        super(props);
        this.state = {elements: []};
    }

    componentWillMount() {
        const { t } = this.props;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };
        fetch(this.props.url, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState({ elements: jsonData })
         })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
        return(
        <div>
            <DriversTable elements={ this.state.elements} />
        </div>

        )
    }
}

export default Drivers;