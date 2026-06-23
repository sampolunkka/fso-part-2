import React, { useEffect } from 'react';
import countriesClient from "./client/countriesClient.jsx";
import CountriesFilter from "./CountriesFilter.jsx";
import CountriesList from "./CountriesList.jsx";
import Weather from "./Weather.jsx";
import weatherClient from "./client/weatherClient.jsx";

const App = () => {
    const [filter, setFilter] = React.useState('');
    const [countries, setCountries] = React.useState([]);
    const [filteredCountries, setFilteredCountries] = React.useState([]);
    const [shownCountry, setShownCountry] = React.useState(null);
    const [weather, setWeather] = React.useState(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        refreshFilteredCountries(newFilter);
    };

    const handleShowCountry = (country) => {
        if (shownCountry && shownCountry.name.common === country.name.common) {
            return;
        }
        weatherClient.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then((response => {
                setFilteredCountries([country]);
                setShownCountry(country);
                setWeather(response.data);
            }));
    }

    const refreshFilteredCountries = (filterValue) => {
        const filteredCountries = countries.filter(country => {
            const countryNameNormalized = country.name.common.toLowerCase();
            const filterNormalized = filterValue.toLowerCase();
            return countryNameNormalized.includes(filterNormalized);
        });

        setFilteredCountries(filteredCountries);

        if (filteredCountries.length === 1) {
            handleShowCountry(filteredCountries[0]);
        } else {
            setShownCountry(null);
            setWeather(null);
        }
    }

    const fetchCountries = () => {
        return countriesClient.getAll()
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            });
    }

    return (
        <div>
            <h1>Maailman maatiedot</h1>
            <CountriesFilter handleFilterChange={handleFilterChange} filter={filter}/>
            <CountriesList countries={filteredCountries} handleShowCountry={handleShowCountry}/>
            <Weather country={shownCountry} weather={weather}/>
        </div>
    )
}

export default App;