import axios from "axios";

const baseUrl = "https://api.open-meteo.com/v1/forecast";


const getWeather = (latitude, longitude) => {
    return axios.get(`${baseUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`)
        .then(response => response)
        .catch(error => {
            console.log(`Error fetching weather data: ${error}`);
            throw error;
        });
}

export default { getWeather };