import {errorUi} from "./getTodayMatches.js";
import fetchApi from "./fetchApi.js";

const getCompetitions = () => {
    fetchApi("https://api.football-data.org/v2/competitions?plan=TIER_ONE")
    .then(response => {
        if(response.status === 200){
           return response.json();
        }
    }).then(data => {
        //  memanggil fungsi updateUi kompetisi
        updateUiCompetitions(data);
        
        //  Initialize modal for standings
        const modal = document.querySelector(".modal");
        M.Modal.init(modal);
    }).catch(error => {
        // menampilkan Ui error pada page
        document.querySelector(".competitions-content").innerHTML = errorUi();
        console.log(error)
    })
};



// function updateUi competitions
const updateUiCompetitions = data => {
    const competitions = data.competitions;
    let listCompetitions = ``;
    competitions.forEach(compet => {
        // memfilter daftar kompetisi
        if(compet.id === 2002 ||
            compet.id === 2003 ||
            compet.id === 2021 ||
            compet.id === 2014 ||
            compet.id === 2015 ||
            compet.id === 2019) {
            listCompetitions += `
                            <div class="col s12 l10 offset-l1">
                                <div class="card-panel">
                                    <div class="row">
                                        <div class="col s12 m4 card-image center">
                                            <img src="${compet.area.ensignUrl.replace(/^http:\/\//i, "https://")}" alt="${compet.area.name}" class="z-depth-1">
                                        </div>
                                        <div class="col s12 m8">
                                            <div class="card-content">
                                                <h6>${compet.name}</h6>
                                                <p>${compet.area.name}</p>
                                            </div> 
                                            <div class="card-action">
                                                <a href="#modal-standing" class="waves-effect waves-light btn-small black-text teal lighten-2 modal-trigger stand-but" id-compet="${compet.id}">Standings</a>
                                                <a href="#schedule?id=${compet.id}" class="waves-effect waves-light btn-small black-text teal lighten-2 sced-but">Scedule Matches</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `
        }
    });
    document.querySelector(".competitions-content").innerHTML = listCompetitions;
}
export default getCompetitions;