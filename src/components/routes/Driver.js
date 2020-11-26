const Driver = props => {

    const {driver} = props;

    return (
        <div>
            <h5>Id:</h5>
            <p>{driver.user.id}</p>
            <h5>Name: </h5>
            <p>{driver.user.first_name} {driver.user.last_name}</p>
            <h5>Pay for km</h5>
            <p>{driver.pay_for_km}</p>
            <h5>Average speed per hour</h5>
            <p>{driver.average_speed_per_hour}</p>
            <h5>Current location</h5>
            <p>{driver.current_location}</p>
            <h5>Health state:</h5>
            <p>{driver.health_state}</p>
        </div>
    )
}

export default Driver;