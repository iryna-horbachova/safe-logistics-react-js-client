import React from 'react';
import credentials from "../../constants/constants";
import Driver from "./Driver";
import {SubmitButton} from "../reusable/Button";

const LOADS = {
    'P': 'Passenger',
    'C': 'Cargo'
}

class RouteDriver extends React.Component {
    constructor(props){
        super(props);
        this.state = { driver: {
                car_type: '',
                car_max_load: '',
                experience: '',
                current_location: '',
                pay_for_km: '',
                average_speed_per_hour: '',
                license_type: '',
                health_state: '',
                user: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    id: '',
                }
            }};
    }

    componentWillMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/users/drivers/" + this.props.match.params.driver_id, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState( { driver: jsonData })
                console.log('driver')
                console.log(this.state.driver)
         })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
        const { t } = this.props;

        const designateRoute = e => {
            e.preventDefault()

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
                body: JSON.stringify({ 'driver_id': this.props.match.params.driver_id,
                    'route_id': this.props.match.params.route_id }),
            };

            fetch("http://127.0.0.1:8000/assignment/designate/route/", requestOptions)
                .then((response) => response.json())
                .then((jsonData) => {
                    if (jsonData.error != null) {
                        alert(jsonData.error);
                    } else {
                        console.log(jsonData.id)
                        this.props.history.push('/designated/' + jsonData.id)
                    }

             })
            .catch((error) => {
                alert(error);
                console.log("error")
                console.error(error);
            })
        }

        return(
        <div>
            <h4>Your perfect driver for the route</h4>
            <Driver driver={ this.state.driver}/>
            <form onSubmit={designateRoute}>
                <SubmitButton
                    className="btn btn-primary"
                    label={t("Create designated route")}
                />
            </form>
        </div>

        )
    }
}

export default RouteDriver;