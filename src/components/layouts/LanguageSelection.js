import React, { useState } from 'react';

import {useHistory} from "react-router-dom";
//import i18n from "../../i18n";
import { useTranslation } from 'react-i18next';


const LanguageSelection = props => {
    const history = useHistory();
    const { t, i18n } = useTranslation();

    const [language, setLanuage] = useState({
        data: {
            current_language: 'en',
        }
    });

    const {
        current_language
    } = language.data;


    const onChange = e => {
        const { name, value } = e.target;
        const { data } = language;
        setLanuage({
            data: {
                ...data,
                [name]: value
            }
        });
        i18n.changeLanguage(value);
    }


    const languageOptions = [
        {
            label: "English",
            value: "en",
        },
        {
            label: "Українська",
            value: "ukr",
        },
    ];

    return (
        <>
            <h5>{t("Select language")}</h5>
                <div className="form-group">
                    <select value={current_language} onChange={onChange} id="license_type" name="current_language">
                        {languageOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
        </>
    )
}

export default LanguageSelection;