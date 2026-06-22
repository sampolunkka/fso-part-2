import React, { useEffect } from 'react';
import countriesClient from "./client/countriesClient.jsx";
import CountriesFilter from "./CountriesFilter.jsx";
import CountriesList from "./CountriesList.jsx";

const App = () => {
    const [filter, setFilter] = React.useState('');
    const [countries, setCountries] = React.useState([]);
    const [filteredCountries, setFilteredCountries] = React.useState([]);

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        refreshFilteredCountries(newFilter);
    };

    const refreshFilteredCountries = (filterValue) => {
        const filteredCountries = countries.filter(country => {
            const countryNameNormalized = country.name.common.toLowerCase();
            const filterNormalized = filterValue.toLowerCase();
            return countryNameNormalized.includes(filterNormalized);
        });
        setFilteredCountries(filteredCountries);
    }

    const fetchCountries = () => {
        return countriesClient.getAll()
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data); // Initialize with all countries
            });
    }

    return (
        <div>
            <h1>Maailman maatiedot</h1>
            <CountriesFilter handleFilterChange={handleFilterChange} filter={filter}/>
            <CountriesList countries={filteredCountries} />
        </div>
    )
}

export default App;