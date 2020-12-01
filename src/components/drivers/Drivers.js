import React from 'react';
import {SubmitButton} from "../reusable/Button";
import DriversTable from "../table/DriversTable";

import {Link} from "react-router-dom";

import credentials from "../../constants/constants";
import {useTranslation} from "react-i18next";

class Drivers extends React.Component {
    constructor(props){
        super(props);
        this.state = {elements: []};
    }

    componentWillMount() {
        console.log("Credentials from drivers ")
        console.log(credentials.token)
        const { t } = this.props;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };
        fetch(this.props.url, requestOptions)
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
            <DriversTable elements={ this.state.elements} fields={['user.first_name']}/>
        </div>

        )
    }
}

export default Drivers;