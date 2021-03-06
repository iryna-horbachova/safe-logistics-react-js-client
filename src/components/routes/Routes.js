import React from 'react';
import RoutesTable from "../table/RoutesTable";
import credentials from "../../constants/constants";

class Routes extends React.Component {
    constructor(props){
        super(props);
        this.state = {elements: []};
    }

    componentWillMount() {
        console.log("routes token")
        console.log(credentials.token)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };

        fetch(this.props.url, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                //print(k)
                this.setState({ elements: jsonData })

         })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {

        return(
        <div>
            <RoutesTable elements={ this.state.elements}/>
        </div>

        )
    }
}

export default Routes;