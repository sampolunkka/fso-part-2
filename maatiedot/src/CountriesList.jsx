import React from "react";
import Country from "./Country.jsx";

const CountriesList = ({countries, handleShowCountry, weather = null}) => {

    if (!countries) {
        return null;
    } else if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (countries.length === 1) {
        const country = countries[0];
        return Country({country, weather});
    }

    return (
        <div>
            {countries.map(country => <p key={country.name.common}>{country.name.common}
                <button onClick={() => handleShowCountry(country)}>Show</button>
            </p>)}
        </div>
    );
}

export default CountriesList;