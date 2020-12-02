import {useTranslation} from "react-i18next";

const Driver = props => {

    const {driver} = props;
    const { t, i18n } = useTranslation();

    return (
        <div>
            <h5>Id</h5>
            <p>{driver.user.id}</p>
            <h5>{t("Name")} </h5>
            <p>{driver.user.first_name} {driver.user.last_name}</p>
            <h5>{t("Pay for km")}</h5>
            <p>{driver.pay_for_km}</p>
            <h5>{t("Average speed per hour")}</h5>
            <p>{driver.average_speed_per_hour}</p>
            <h5>{t("Current location")}</h5>
            <p>{driver.current_location}</p>
            <h5>{t("Health state")}</h5>
            <p>{driver.health_state}</p>
        </div>
    )
}

export default Driver;