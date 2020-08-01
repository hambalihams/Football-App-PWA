import {saveToDB} from "./db.js";

// event untuk menyimpan pertandingan
content.addEventListener("click", (event) => {
  if (event.target.className.includes("saved-but")) {
    const saveBut = event.target;
  
    // mengambil semua data match yang di save
    const idMatch = parseInt(saveBut.getAttribute("id-match"));
    const parentElem = saveBut.parentElement;
    const competName = parentElem.querySelector(".compet-name").innerText;
    const matchday = parentElem.querySelector(".matchday-text").innerText;
    const homeTeamName = parentElem.querySelector(".home-team-name").innerText;
    const homeTeamLogo = parentElem.querySelector(".logo-team-home").getAttribute("src");
    const awayTeamName = parentElem.querySelector(".away-team-name").innerText;
    const awayTeamLogo = parentElem.querySelector(".logo-team-away").getAttribute("src");
    const dateMatch = parentElem.querySelector(".date-match").innerText;
    const savedText = parentElem.querySelector(".saved-text");

    const matchSaved = {
      id: idMatch,
      competition: competName,
      matchday: matchday,
      homeTeamName: homeTeamName,
      homeTeamLogo: homeTeamLogo,
      awayTeamName: awayTeamName,
      awayTeamLogo: awayTeamLogo,
      dateMatch: dateMatch,
      created: new Date().getTime()
    };
    
    // menyimpan data match ke indexed DB
    saveToDB(matchSaved)
    .then(() => {
      // memanggil tost alert materialize css
      M.toast({html: 'MATCH SAVED !'});
      saveBut.style.display = "none";
      savedText.style.display = "block";
    })
    .catch(err => {
      console.log("Error: ", err);
      // memanggil tost alert materialize css
      M.toast({html: 'MATCH ALREADY SAVED !'})
    })
  }
});

