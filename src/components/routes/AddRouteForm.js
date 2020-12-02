import React, { useState } from 'react';

import { FormInput } from '../reusable/FormInput';
import { SubmitButton } from '../reusable/Button';
import credentials from "../../constants/constants";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";


const AddRouteForm = () => {

    const { t, i18n } = useTranslation();
    const history = useHistory();

    const [route, setRoute] = useState({
        data: {
            title: '',
            priority: 'S',
            load_type: 'P',
            load_quantity: '',
            start_location: '',
            end_location: '',
            min_experience: '',
            min_health: '',
        }
    });

    const {
        title,
        priority,
        load_type,
        load_quantity,
        start_location,
        end_location,
        min_experience,
        min_health,
    } = route.data;

    const onAddRoute = async e => {
        e.preventDefault();
        var manager_id = 1
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
        };
        fetch("http://127.0.0.1:8000/users/manager_profile/", requestOptions)
            .then((response) => response.json())
            .then((jsonData) => {
                manager_id = jsonData.user.id
                console.log(manager_id)
         })
        .catch((error) => {
            console.error(error);
        })

        const { data } = route;

        const s_loc = "SRID=4326;POINT (" + start_location + ")"
        const e_loc = "SRID=4326;POINT (" + end_location + ")"

        const requestOptions2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
            body: JSON.stringify({ title: title, priority: priority,
            load_type: load_type, load_quantity: load_quantity, start_location: s_loc, end_location: e_loc,
            min_experience: min_experience, min_health: min_health, manager: manager_id}),
        };

        fetch("http://127.0.0.1:8000/routes/", requestOptions2)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                if (jsonData.error != null) {
                    alert(jsonData.error);
                } else {
                    history.push('/routes')
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
        const { data } = route;
        setRoute({
            data: {
                ...data,
                [name]: value
            }
        });
    }

    const priorityOptions = [
        {
            label: "High",
            value: "H",
        },
        {
            label: "Standard",
            value: "S",
        },
        {
            label: "Low",
            value: "L",
        },
    ];

    const loadTypeOptions = [
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
            <h1>{t("Add route")}</h1>
            <form onSubmit={onAddRoute}>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="title"
                        label={t("Title")}
                        className="form-control"
                        placeholder=""
                        value={title}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="start_location"
                        label={t("Start location")}
                        className="form-control"
                        placeholder=""
                        value={start_location}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="end_location"
                        label={t("End location")}
                        className="form-control"
                        placeholder=""
                        value={end_location}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="number"
                        name="load_quantity"
                        label={t("Load quantity")}
                        className="form-control"
                        placeholder=""
                        value={load_quantity}
                        error=""
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <FormInput
                        type="number"
                        name="min_experience"
                        label={t("Min experience")}
                        className="form-control"
                        placeholder=""
                        value={min_experience}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="number"
                        name="min_health"
                        label={t("Min health")}
                        className="form-control"
                        placeholder=""
                        value={min_health}
                        error=""
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <p>{t("Load type")}</p>
                    <select value={load_type} onChange={onChange} id="car_type" name="car_type">
                        {loadTypeOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <p>{t("Priority")}</p>
                    <select value={priority} onChange={onChange} id="license_type" name="license_type">
                        {priorityOptions.map((option) => (
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

export default AddRouteForm;