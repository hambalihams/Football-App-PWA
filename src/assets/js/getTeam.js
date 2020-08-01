import fetchApi from "./fetchApi.js";

const getTeam = id => {
    return fetchApi(`https://api.football-data.org/v2/competitions/${id}/teams`)
    .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error)) 
};
 export default getTeam;