import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjBkZjUyNjkzYzM2MjgyMTQ1Njk0ZTE3OWI1Nzc4ZSIsInN1YiI6IjY2NTFlY2Q2MGVkOTk4NWM0MTU1YjVmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5EcEywLhMCBxdvY9F8UtbhfuUWrw9s_qGlFHHft5UiU'
      }
});

export default instance;