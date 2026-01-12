import React, {use, useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import Phonebook from "./Phonebook.jsx";
import PersonForm from "./PersonForm.jsx";
import SearchFilter from "./SearchFilter.jsx";

// In the example all strings are case-sensitive and not trimmed.
// In this implementation, names are normalized byt the following function,
// which should result in better user experience, since we don't require
// exact matches when searching or checking for duplicates.
const normalizeName = (name) => {
    return name.toLowerCase().trim();
};

const nameNormalizedIsUniqueInCollection = (name, persons) => {
    return !persons.filter(person => normalizeName(person.name) === normalizeName(name)).length;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
                setFilteredPersons(response.data);
            });
    }, []);

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const refreshFilteredPersons = (personsArray, filterString) => {
        const filterNormalized = normalizeName(filterString);
        if (filterNormalized.length) {
            const filteredPersons = personsArray.filter(person => {
                const personNameNormalized = normalizeName(person.name);
                return personNameNormalized.includes(filterNormalized);
            });
            console.log(filteredPersons);
            setFilteredPersons(filteredPersons);
        } else {
            setFilteredPersons(personsArray);
        }
    }

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        refreshFilteredPersons(persons, newFilter);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (nameNormalizedIsUniqueInCollection(newName, persons)) {
            const newPersons = persons.concat({name: newName, number: newNumber});
            setPersons(newPersons);
            setNewName('');
            setNewNumber('');
            refreshFilteredPersons(newPersons, filter);
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <h2>Filter entries</h2>
            <SearchFilter handleFilterChange={handleFilterChange}/>
            <h2>Add new entry</h2>
            <PersonForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Entries</h2>
            <Phonebook persons={filteredPersons}/>
        </div>
    );
};

export default App;