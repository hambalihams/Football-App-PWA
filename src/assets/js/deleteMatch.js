import {deleteDataDB} from "./db.js";
import getSavedMatches from "./getSavedMatches.js";

content.addEventListener("click", (event) => {
    if (event.target.className.includes("delete-but")) {
        const deleteBut = event.target;
        const idMatch = parseInt(deleteBut.getAttribute("id-match"));
      
        //   menghapus match dari index DB
        deleteDataDB(idMatch)
          .then(() =>  M.toast({html: 'MATCH DELETED !'}))
          .catch(err => console.log("Error: ", err))

          setTimeout(getSavedMatches, 900);
    }
  });