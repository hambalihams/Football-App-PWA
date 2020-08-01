import {getDataDB} from "./db.js";

const getSavedMatches = () => {
    const dataDB = getDataDB();
    dataDB.then(response => {
        // mereverse array response
        const responseReverse = [];
        for (let i = response.length-1 ; i >= 0; i--) {
            responseReverse.push(response[i]);
        };

        let listSaved = '';
        if(responseReverse.length === 0){
            listSaved = `<div class="col s12 l10 offset-l1">
                            <div class="card-panel center">
                                <h6>You not yet saving any match</h6>
                            </div>
                        </div>`
        }else{
            responseReverse.forEach(result => {
                listSaved += `  <div class="col s12 l10 offset-l1">
                                    <div class="card-panel">
                                        <div class="row">
                                            <div class="col s12">
                                                <h6 class="compet-name">${result.competition}</h6>
                                            </div>
                                            <div class="col s12 center">
                                                <p class="matchday-text">${result.matchday}</p>
                                            </div>
                                            <div class="col s5 home-team center">
                                                <img src="${result.homeTeamLogo.replace(/^http:\/\//i, "https://")}" alt="${result.homeTeamName}" class="logo-team logo-team-home">
                                                <p class="team-name home-team-name">${result.homeTeamName}</p>
                                            </div>
                                            <div class="col s2 center">
                                                <h6>VS</h6>
                                            </div>
                                            <div class="col s5 away-team center">
                                                <img src="${result.awayTeamLogo.replace(/^http:\/\//i, "https://")}" alt="${result.awayTeamName}" class="logo-team logo-team-away">
                                                <p class="team-name away-team-name">${result.awayTeamName}</p>
                                            </div>
                                            <div class="col s12">
                                                <p class="center date-match">${result.dateMatch}</p>
                                            </div>
                                        </div>
                                        <i class="material-icons teal white-text z-depth-2 delete-but" id="" id-match="${result.id}">delete_forever</i>
                                    </div>
                                </div>`
            });
        };
        document.querySelector(".matches-content").innerHTML = listSaved;
    });
};

export default getSavedMatches;