import {errorUi} from "./getTodayMatches.js";
import getTeam from "./getTeam.js";
import fetchApi from "./fetchApi.js";
import {getDataIdKeysFromDB} from "./db.js";

const getSchedules = url => {
    const i = url.indexOf("=")
    const idCompet = url.slice(i+1);
    
    fetchApi(`https://api.football-data.org/v2/competitions/${idCompet}/matches?status=SCHEDULED`)
        .then(response => {
            if(response.status === 200){
            return response.json();
            }
        })
        .then(data => {
            //  memanggil fungsi update Ui match
            uiScehduleMatches(data);

            if(data.count !== 0){
                // baris kode untuk mengambil src img logo team yang bertanding
                const insertLogo = async () => {
                    // req Api daftar team
                    const results = await getTeam(idCompet);
                    const teams = results.teams;
                    
                    // mengambil semua element img
                    const imgElements = document.querySelectorAll(".logo-team");
                    imgElements.forEach(imgElement => {
                        let idTeam = imgElement.getAttribute("id-team");
                        idTeam = parseInt(idTeam);
                        // mencari tim dari aray teams
                        const findTeam = teams.find(team => {
                            return team.id === idTeam;
                        });
                        if(findTeam){
                            imgElement.setAttribute("src", findTeam.crestUrl.replace(/^http:\/\//i, "https://"));
                        }
                    })
                };
                insertLogo();

                // baris kode untuk menghilangkan tombol save jika match sudah disimpan
                const idMatchesSavedPromise = getDataIdKeysFromDB();
                idMatchesSavedPromise.then(idMatchesSaved => {
                    const saveButtons = document.querySelectorAll(".saved-but");
                    saveButtons.forEach(saveButton => {
                        let idMatch = saveButton.getAttribute("id-match");
                        idMatch = parseInt(idMatch);

                        const findMatchSaved = idMatchesSaved.find(idMatchSaved => {
                            return idMatch === idMatchSaved;
                        });
                        if(findMatchSaved){
                            saveButton.style.display = "none";
                            const savedText = saveButton.parentElement.querySelector(".saved-text");
                            savedText.style.display = "block";
                        }
                    });
                })
            };
        })
        .catch(error => {
            // menampilkan Ui error pada page
            document.querySelector(".matches-content").innerHTML = errorUi();
            console.log(error)
    })
};

const uiScehduleMatches = data => {
    let listMatches = ``;
    // tampilan jika tidak jadwal
    if (data.count === 0) {
        listMatches = `
                    <div class="col s12 l10 offset-l1">
                        <div class="card-panel center">
                            <h5>Sorry, for now nothing match schedules</h5>
                        </div>
                    </div>
                `;
    }else {
        const matches = data.matches.slice(0, 10);
        matches.forEach(  match => {
            listMatches += `
                    <div class="col s12 l10 offset-l1">
                        <div class="card-panel">
                            <div class="row">
                                <div class="col s12">
                                    <h6 class="compet-name">${data.competition.name}</h6>
                                </div>
                                <div class="col s12 center">
                                    <p class="matchday-text">Matchday ${match.matchday}</p>
                                </div>
                                <div class="col s5 home-team center">
                                    <img alt="${match.homeTeam.name}" class="logo-team logo-team-home" id-team="${match.homeTeam.id}">
                                    <p class="team-name home-team-name">${match.homeTeam.name}</p>
                                </div>
                                <div class="col s2 center">
                                    <h6>VS</h6>
                                </div>
                                <div class="col s5 away-team center">
                                    <img alt="${match.awayTeam.name}" class="logo-team logo-team-away" id-team="${match.awayTeam.id}">
                                    <p class="team-name away-team-name">${match.awayTeam.name}</p>
                                </div>
                                <div class="col s12">
                                    <p class="center date-match">${new Date(match.utcDate).toString().slice(0, 21)}</p>
                                </div>
                            </div>
                            <p class="center-align teal-text saved-text">Match already on list saved</p>
                            <i class="material-icons teal white-text z-depth-2 saved-but" id-match="${match.id}">save</i>
                        </div>
                    </div>
                `
            });
    };
    document.querySelector(".matches-content").innerHTML = listMatches;
};

export default getSchedules;