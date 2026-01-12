import React from "react";

const PhonebookEntry = ({person}) => {
    return (
        <p>{person.name} {person.number}</p>
    );
};

const Phonebook = ({persons}) => {
    return (
        <div>
            {persons.map((person, index) =>
                <PhonebookEntry key={index} person={person}/>
            )}
        </div>
    );
};

export default Phonebook;