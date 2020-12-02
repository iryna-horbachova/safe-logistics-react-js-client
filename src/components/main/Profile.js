import credentials from "../../constants/constants";
import React from "react";
import {SubmitButton} from "../reusable/Button";


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
        const { t } = this.props;

        const backup = e => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/assignment/backup/" + e.target.id, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                alert("Database backed up successfully")

             })
            .catch((error) => {
                console.log("error")
                console.error(error);
            })
        }

        const restore = e => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/assignment/restore/" + e.target.id, requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                alert("Database restored successfully")
             })
            .catch((error) => {
                console.log("error")
                console.error(error);
            })
        }

        return (
            <div>
                <h5>{t("Name")}</h5>
                <p>{this.state.manager.user.first_name} {this.state.manager.user.last_name}</p>
                <h5>{t("Email")} </h5>
                <p>{this.state.manager.user.email}</p>
                <h5>{t("Company")}</h5>
                <p>{this.state.manager.company}</p>
                <div className="btn-group" role="group">
                    <form onSubmit={backup} >
                        <SubmitButton
                            className="btn btn-primary"
                            label={t("Backup db")}
                        />
                    </form>
                    <form onSubmit={restore} >
                        <SubmitButton
                            className="btn btn-danger"
                            label={t("Restore db")}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Profile;