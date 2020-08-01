import {getTodayMatches} from "./getTodayMatches.js";
import getCompetitions from "./getCompetitions.js";
import getStandings from "./getStandings.js";
import getSchedules from "./getSchedules.js";
import getSavedMatches from "./getSavedMatches.js";

const navigation = () => {
    // init sidenav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {edge: "right"});

    // function load page
    let url = window.location.hash.substr(1);
    if(url === ""){url = "home"};

    const loadPage = (url) => {
        const content = document.querySelector("#content");
        // menghapus parameter pada url
        if(url.includes("?")){
            let i = url.indexOf("?");
            url = url.slice(0, i);
        };

        fetch(`/pages/${url}.html`)
        .then(response => {
            if(response.status === 200){
                return response.text();
            }else {
                console.log(`Error ${response.status} ${response.statusText}`)
                return `<h5>Page ${response.statusText}!</h5>`;
            }
        })
        .then(response => {
            content.innerHTML = response;
        })
    }

    // event load page from nav
    const navs = document.querySelectorAll("#side-nav a, #top-nav a");
    navs.forEach(ele => {
        ele.addEventListener('click', ev => {
            url = ev.target.hash.substr(1);
            loadPage(url);

            // fungsi req data ke football.org Api dan indexedDB
            switch(url){
                case "home":
                    getTodayMatches();
                    break;
                case "competitions":
                    getCompetitions();
                    break;
                case "saved":
                    setTimeout(getSavedMatches, 900);
                    break;
            };
        })
    });

    // event get standing dan scedules pada halaman competitions
    content.addEventListener("click", e => {
        // event untuk get standings
        if(e.target.className.includes("stand-but")){
            // Mengambil Id kompetisi
            const idCompet = e.target.getAttribute("id-compet");
            getStandings(idCompet);
        }

        // event untuk get schedules
        if(e.target.className.includes("sced-but")){
            url = e.target.hash.substr(1);
            // req halaman schedule
            loadPage(url);
            // req data api schedule
            getSchedules(url);
        }
    });

    loadPage(url);
    switch(url){
        case "home":
            getTodayMatches();
            break;
        case "competitions":
            getCompetitions();
            break;
        case "saved":
            setTimeout(getSavedMatches, 900);
            break;
    };
    if(url.includes("schedule")){getSchedules(url)};
};

export default navigation;