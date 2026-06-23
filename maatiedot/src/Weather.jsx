import React from "react";

const Weather = ({country, weather}) => {

    if (!weather) {
        return null;
    }

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {weather.current.temperature_2m} °C</p>
            <p>Wind: {weather.current.wind_speed_10m} m/s</p>
        </div>
    )
}

export default Weather;