import credentials from "../../constants/constants";
import React from 'react';

class DesignatedRoute extends React.Component {
    constructor(props){
        super(props);
        this.state = { d_route: {
                id: '',
                status: '',
                route: {
                    id: '',
                    title: '',
                },
                driver: {
                    user: {
                        email: '',
                        first_name: '',
                        last_name: '',
                        id: '',
                    }
                }
            }};
    }

    componentWillMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/routes/designated/" + this.props.match.params.value, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log("setting d_route")
                console.log(jsonData)
                this.setState( { d_route: jsonData })
                console.log(this.state.d_route)
         })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
        const STATUS = {
            'N': 'Not started',
            'I': 'In progress',
            'F': 'Finished',
        }

        return(
        <div class="container">
            <h4>Designated route</h4>
            <h5>Id</h5>
            <p>{this.state.d_route.id}</p>
            <h5>Title</h5>
            <p>{this.state.d_route.route.title}</p>
            <h5>Driver</h5>
            <p>{this.state.d_route.driver.user.first_name} {this.state.d_route.driver.user.last_name}</p>
            <h5>Status</h5>
            <p>{STATUS[this.state.d_route.status]}</p>
        </div>

        )
    }
}

export default DesignatedRoute;