import React, { useState, useEffect } from 'react';

import { FormInput } from '../reusable/FormInput';
import { SubmitButton } from '../reusable/Button';
import credentials from "../../constants/constants";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";


const AddDriverForm = props => {

    const history = useHistory();
    const { t, i18n } = useTranslation();

    const [carType, setCarType] = useState('Select car type');
    const [licenseType, setLicenseType] = useState('Select license type');

    const [driver, setDriver] = useState({
        data: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            car_type: 'P',
            experience: '',
            pay_for_km: '',
            license_type: 'A',
            car_max_load: '',
            average_speed_per_hour: ''
        }
    });

    const {
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        car_type,
        experience,
        pay_for_km,
        license_type,
        car_max_load,
        average_speed_per_hour,
    } = driver.data;

    const onAddDriver = async e => {
        e.preventDefault();
        const { data } = driver;
        data.car_type = carType;
        data.license_type = licenseType;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
            body: JSON.stringify({ first_name: first_name, last_name: last_name,
            email: email, password: password, confirm_password: confirm_password, car_type: car_type,
            experience: experience, pay_for_km: pay_for_km, license_type: license_type,
            car_max_load: car_max_load, average_speed_per_hour: average_speed_per_hour}),
        };

        fetch("http://127.0.0.1:8000/users/register/driver", requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                if (jsonData.error != null) {
                    alert(jsonData.error);
                } else {
                    history.push('/drivers')
                }
            })
            .catch((error) => {
                console.log("error")
                console.error(error);
                alert(error);
            })
        clearFormFields();
    }

    const onChange = e => {
        const { name, value } = e.target;
        const { data } = driver;
        setDriver({
            data: {
                ...data,
                [name]: value
            }
        });
    }

    const clearFormFields = () => {
        setDriver({
            data: {
                first_name: '',
                last_name: '',
                email: '',
                car_type: '',
                experience: '',
                license_type: '',
            }
        });
        setCarType('Select car type');
        setLicenseType('Select license type');
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
        <>
            <h1>{t("Add driver")}</h1>
            <form onSubmit={onAddDriver}>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="first_name"
                        label={t("First name")}
                        className="form-control"
                        placeholder=""
                        value={first_name}
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
                        value={last_name}
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
                        value={email}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="password"
                        name="password"
                        label={t("Password")}
                        className="form-control"
                        placeholder=""
                        value={password}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="password"
                        name="confirm_password"
                        label={t("Confirm password")}
                        className="form-control"
                        placeholder=""
                        value={confirm_password}
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
        </>
    )
}

export default AddDriverForm;