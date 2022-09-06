import axios from 'axios';

const searchApi = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    params: {
        limit: 5,
        country: "ar",
        language: "es",
        access_token: "pk.eyJ1Ijoiam9zZWFsYXIiLCJhIjoiY2w3Z3E1MjR6MDZ6bTNvbWhoenVjemFicCJ9.yM3QT5aQgKqeLKTDt7sUVw"
    }
})

export default searchApi;