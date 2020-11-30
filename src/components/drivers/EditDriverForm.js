import React, { useState } from 'react';

import { FormInput } from '../reusable/FormInput';
import { SubmitButton } from '../reusable/Button';


const EditDriverForm = props => {
    const { addModal } = props;

    const [carType, setCarType] = useState('Select car type');
    const [licenseType, setLicenseType] = useState('Select license type');

    const [driver, setDriver] = useState({
        data: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            car_type: '',
            experience: '',
            license_type: '',
        }
    });

    const {
        first_name,
        last_name,
        email,
        password,
        car_type,
        experience,
        license_type,
    } = driver.data;

    const onAddDriver = async e => {
        e.preventDefault();
        const { data } = driver;
        data.car_type = carType;
        data.license_type = licenseType;

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

    return (
        <>
            <form onSubmit={onAddDriver}>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="first_name"
                        label="First name"
                        className="form-control"
                        placeholder="Enter first name"
                        value={first_name}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="last_name"
                        label="Last name"
                        className="form-control"
                        placeholder="Enter Last Name"
                        value={last_name}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="text"
                        name="email"
                        label="Email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="password"
                        name="password"
                        label="Password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        error=""
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        type="number"
                        name="experience"
                        label="Experience"
                        className="form-control"
                        placeholder="Enter Experience"
                        value={experience}
                        error=""
                        onChange={onChange}
                    />
                </div>
                 <div className="form-group">
                     <a>Car Type</a>
                     <select>
                     <option value="SP">Small Passenger</option>
                    <option value="LC">Light Cargo</option>
                    <option selected value="MC">Medium Cargo</option>
                    <option value="MP">Medium Passenger</option>
                    </select>
                 </div>
                <div className="form-group">
                     <a>License Type</a>
                     <select>
                     <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    </select>
                 </div>


                <SubmitButton
                    className="btn btn-primary"
                    label="ADD"
                    disabled={
                        !first_name || !last_name || !email || !experience
                    }
                />
            </form>
        </>
    )
}

export default EditDriverForm;