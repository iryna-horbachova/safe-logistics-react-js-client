import React from 'react';

import { FormInput } from '../reusable/FormInput';
import { SubmitButton } from '../reusable/Button';
import credentials from "../../constants/constants";


class EditDriverForm extends React.Component {
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
        console.log("")
        console.log(this.props.match.params.id)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };

        fetch("http://127.0.0.1:8000/users/drivers/" + this.props.match.params.id, requestOptions)
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

    const {
        car_type,
        car_max_load,
        experience,
        current_location,
        pay_for_km,
        average_speed_per_hour,
        license_type,
        health_state,
        user
    } = this.state.driver;

    const onAddDriver = async e => {
        e.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
            body: JSON.stringify({user: user, car_type: car_type,
            experience: experience, pay_for_km: pay_for_km, license_type: license_type,
            car_max_load: car_max_load, average_speed_per_hour: average_speed_per_hour}),
        };

        fetch("http://127.0.0.1:8000/users/drivers", requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                if (jsonData.error != null) {
                    alert(jsonData.error);
                } else {

                }
            })
            .catch((error) => {
                console.log("error")
                console.error(error);
                alert(error);
            })
    }

    const onChange = e => {
        const { name, value } = e.target;
       // const { driver } = this.state.driver;

        var driver = {...this.state.driver}
        driver[name] = value;
        this.setState({driver})

       /* this.setState({
            driver: {
                ...driver,
                [name]: value
            }
        }); */
    }

    const licenseOptions = [
        {
            label: "A",
            value: "A",
        },
        {
            label: "B",
            value: "B",
        },
        {
            label: "C",
            value: "C",
        },
        {
            label: "D",
            value: "D",
        },
    ];

    const carTypeOptions = [
        {
            label: "Passenger",
            value: "P",
        },
        {
            label: "Cargo",
            value: "C",
        },
    ];

        return (
        <div>
            <h1>{t("Edit driver")}</h1>
            <form onSubmit={onAddDriver}>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="first_name"
                        label={t("First name")}
                        className="form-control"
                        placeholder=""
                        value={user.first_name}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="last_name"
                        label={t("Last name")}
                        className="form-control"
                        placeholder=""
                        value={user.last_name}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="email"
                        label={t("Email")}
                        className="form-control"
                        placeholder=""
                        value={user.email}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="number"
                        name="experience"
                        label={t("Experience")}
                        className="form-control"
                        placeholder=""
                        value={experience}
                        error=""
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <FormInput
                        type="number"
                        name="pay_for_km"
                        label={t("Pay for km")}
                        className="form-control"
                        placeholder=""
                        value={pay_for_km}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="number"
                        name="car_max_load"
                        label={t("Car max load")}
                        className="form-control"
                        placeholder=""
                        value={car_max_load}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="number"
                        name="average_speed_per_hour"
                        label={t("Average speed per hour")}
                        className="form-control"
                        placeholder=""
                        value={average_speed_per_hour}
                        error=""
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <p>{t("Car type")}</p>
                    <select value={car_type} onChange={onChange} id="car_type" name="car_type">
                        {carTypeOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <p>{t("License type")}</p>
                    <select value={license_type} onChange={onChange} id="license_type" name="license_type">
                        {licenseOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <SubmitButton
                    className="btn btn-primary"
                    label={t("Submit")}
                />
            </form>
        </div>
    )
    }

}

export default EditDriverForm;