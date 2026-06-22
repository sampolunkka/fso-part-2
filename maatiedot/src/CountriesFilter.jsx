import React from 'react';

const CountriesFilter = ({handleFilterChange}) => {
    return (
        <div>
            <input onChange={handleFilterChange}/>
        </div>
    )
}

export default CountriesFilter;