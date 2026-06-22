import React from "react";

const CountriesList = ({countries, handleShowCountry}) => {

    console.log(countries);

    if (!countries) {
        return null;
    } else if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    }

    return (
        <div>
            {countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => handleShowCountry(country)}>show</button></p>)}
        </div>
    );
}

export default CountriesList;