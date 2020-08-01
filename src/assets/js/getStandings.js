import fetchApi from "./fetchApi.js";

// function getstandings
const getStandings = idCompetition => { 
    let standingsElement = document.querySelector("tbody");
    loadingUi(standingsElement);
    fetchApi(`https://api.football-data.org/v2/competitions/${idCompetition}/standings`)
    .then(response => {
        if(response.status === 200){
           return response.json();
        }
    }).then(data => {
        standingsElement.innerHTML = ``;
        // memanggil modal Ui
        modalUi(standingsElement, data);
    }).catch(error => console.log(error))
};


// loadingUI
const loadingUi = elem => {
    elem.innerHTML = `
                    <tr>
                        <td colspan="7">
                            <div class="progress">
                                <div class="indeterminate"></div>
                            </div>
                        </td>
                    </tr>
                `
};

// ModalUI
const modalUi = (elem, data) => {
    const standings = data.standings[0].table;
        standings.forEach(stand => {
            elem.innerHTML += `
                        <tr>
                            <td>${stand.position}</td>
                            <td class="cell-logo"><img src="${stand.team.crestUrl.replace(/^http:\/\//i, "https://")}" alt=".."></td>
                            <td>${stand.team.name}</td>
                            <td>${stand.won}</td>
                            <td>${stand.draw}</td>
                            <td>${stand.lost}</td>
                            <td>${stand.points}</td>
                        </tr>
                     `
        });
}

export default getStandings;