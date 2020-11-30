import credentials from "../../constants/constants";
import React from "react";


class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = { manager: {
            user: {
                username:"",
                email: "",
                first_name: "",
                last_name: "",
                id: 1
            },
                company:""
        }};
    }

    componentWillMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };
        fetch("http://127.0.0.1:8000/users/manager_profile/", requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState({ manager: jsonData })
         })
        .catch((error) => {
            console.error(error);
        })
    }


    render () {
        return (
            <div>
                <h5>Name: </h5>
                <p>{this.state.manager.user.first_name} {this.state.manager.user.last_name}</p>
                <h5>Email: </h5>
                <p>{this.state.manager.user.email}</p>
                <h5>Company: </h5>
                <p>{this.state.manager.company}</p>
            </div>
        )
    }
}

export default Profile;