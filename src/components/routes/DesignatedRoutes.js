import React from 'react';

import DesignatedRoutesTable from "../table/DesignatedRoutesTable";
import credentials from "../../constants/constants";

class DesignatedRoutes extends React.Component {
    constructor(props){
        super(props);
        this.state = {elements: []};
    }

    componentWillMount() {
        console.log("routes token")
        console.log(credentials.token)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                      'Authorization': 'Token ' + credentials.token },
        };

        fetch(this.props.url, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                //print(k)
                this.setState({ elements: jsonData })
                console.log(jsonData)

         })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
        return(
        <div>
            <DesignatedRoutesTable elements={ this.state.elements}/>
        </div>

        )
    }
}

export default DesignatedRoutes;