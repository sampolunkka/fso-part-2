import React, {useEffect} from 'react';
import {useState} from 'react';
import Phonebook from "./Phonebook.jsx";
import PersonForm from "./PersonForm.jsx";
import SearchFilter from "./SearchFilter.jsx";
import restClient from "./restClient.jsx";

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

    const getAllPersons = () => {
        return restClient.getAll()
            .then(response => {
                setPersons(response.data);
                refreshFilteredPersons(response.data, filter);
                return response;
            }).catch(error => console.log(`Error fetching persons: ${error}`));
    }

    useEffect(() => {
        getAllPersons();
    }, []);

    const postPerson = (person) => {
        return restClient.create(person)
            .then(response => {
                const newPersons = persons.concat(response.data);
                setPersons(newPersons);
                setNewName('');
                setNewNumber('');
                refreshFilteredPersons(newPersons, filter);
            }).catch(error => console.log(`Error creating person: ${error}`));
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        refreshFilteredPersons(persons, newFilter);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isUnique = nameNormalizedIsUniqueInCollection(newName, persons);

        if (!isUnique) {
            const existingPerson = persons.find(person =>
                normalizeName(person.name) === normalizeName(newName)
            );

            if (!window.confirm(`${newName} is already in the phonebook. Replace the number?`)) {
                return;
            }

            const updatedPerson = { ...existingPerson, number: newNumber };

            restClient.update(existingPerson.id, updatedPerson)
                .then(response => {
                    // Update state with fresh data
                    const updatedCollection = persons.map(person =>
                        person.id === existingPerson.id ? response.data : person
                    );
                    setPersons(updatedCollection);
                    refreshFilteredPersons(updatedCollection, filter);
                    setNewName('');
                    setNewNumber('');
                })
                .catch(error => console.log(`Error updating person: ${error}`));
        } else {
            postPerson({ name: newName, number: newNumber });
        }
    };

    const handleDelete = (person) => {
        if (!window.confirm(`Delete ${person.name}?`)) return;
        restClient.remove(person.id)
            .then(() => getAllPersons())
            .catch(error => console.log(`Error deleting person: ${error}`));
    }

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
            <Phonebook
                persons={filteredPersons}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default App;