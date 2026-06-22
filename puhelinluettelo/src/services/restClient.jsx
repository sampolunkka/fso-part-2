import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response)
        .catch(error => {
            console.log(`Error fetching persons: ${error}`);
            throw error;
        });
};

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
        .then(response => response)
        .catch(error => {
            console.log(`Error creating person: ${error}`);
            throw error;
        });
};

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
        .then(response => response)
        .catch(error => {
            console.log(`Error updating person: ${error}`);
            throw error;
        });
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response)
        .catch(error => {
            console.log(`Error deleting person: ${error}`);
            throw error;
        });
};

const getById = (id) => {
    return axios.get(`${baseUrl}/${id}`)
        .then(response => response)
        .catch(error => {
            console.log(`Error fetching person by id: ${error}`);
            throw error;
        });
}

export default { getAll, create, update, remove, getById };