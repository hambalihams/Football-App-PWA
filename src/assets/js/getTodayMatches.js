import getTeam from "./getTeam.js";
import fetchApi from "./fetchApi.js";
import {getDataIdKeysFromDB} from "./db.js";

const getTodayMatches = () => {
  fetchApi("https://api.football-data.org/v2/matches?competitions=BL1,PL,SA,PD,FL1,DED")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      // update tampilan today matches
      uiTodayMatches(data);

      // Baris kode untuk mengambil src img logo team yang bertanding
      if(data.count !== 0){
        // Mengambil semua id kompetisi yang bertanding untuk mengambil source img logo team yang bertanding
        const allIdCompet = [];
        data.matches.forEach(match => {
          allIdCompet.push(match.competition.id);
        })
        // memfilter array allIdCompet agar tidak memiliki value yang sama
        const newAllIdCompet = allIdCompet.filter((idCompet, index) => {
          return allIdCompet.indexOf(idCompet) === index;
        })
        
        newAllIdCompet.forEach( async idCompet => {
          const results = await getTeam(idCompet);
          const teams = results.teams
          
          // mengambil semua element img
          const imgElements = document.querySelectorAll(".logo-team");
          imgElements.forEach(imgElement => {
              let idTeamPlaying = imgElement.getAttribute("id-team");
              idTeamPlaying = parseInt(idTeamPlaying);
              // mencari tim dari aray teams
              const findTeam = teams.find(team => {
                  return team.id === idTeamPlaying;
              });
              if(findTeam){
                imgElement.setAttribute("src", findTeam.crestUrl.replace(/^http:\/\//i, "https://"));
              }
            })
        });

        // baris kode untuk menghilangkan tombol save jika match sudah disimpan dan menampilkan text informasi bahwa match telah disimpan
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
        });
      };
    })
    .catch((error) => {
      // menampilkan ui error pada page
      document.querySelector(".matches-content").innerHTML = errorUi();
      console.log(error);
    });
};

// function updateUiMatch
const uiTodayMatches = (data) => {
  let listMatches = ``;
  // tampilan jika tidak ada matchtoday
  if (data.count === 0) {
    listMatches = `
                <div class="col s12 l10 offset-l1">
                    <div class="card-panel center">
                        <h5>Nothing matches today</h5>
                    </div>
                </div>
            `;
  } else {
    const matches = data.matches;
    matches.forEach((match) => {
      listMatches += `
                    <div class="col s12 l10 offset-l1">
                        <div class="card-panel">
                            <div class="row">
                                <div class="col s12">
                                    <h6 class="compet-name">${match.competition.name}</h6>
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
                `;
    });
  }
  document.querySelector(".matches-content").innerHTML = listMatches;
};

const errorUi = () => {
  return `
    <div class="col s12 l10 offset-l1">
        <div class="card-panel center">
            <h5>Ups something wrong :(</h5>
        </div>
    </div>
`;
};

export { getTodayMatches, errorUi };
