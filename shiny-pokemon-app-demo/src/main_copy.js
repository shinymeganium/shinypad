// npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

// check if there is data and is it list
function getSavedData(key, isList) {
  if (localStorage.getItem(key) != null)
      return JSON.stringify(localStorage.getItem(key));
  else {
    if (isList)
      return [];
    else
      return null;
  }
}

let targets = getSavedData("targets", true); // ls key: targets
let shinies = getSavedData("shinies", true); // ls key: shinies
let currentHunt = getSavedData("currentHunt", false);

function toggleNav(text) {
  document.getElementById("header-text").innerHTML = text;
  document.getElementById("nav-mobile").classList.toggle("hidden");
  document.getElementById("header-b1").classList.toggle("hidden");
  document.getElementById("header-b2").classList.toggle("hidden");
}

function toggleSelection(sID, headerTxt) {
  toggleNav(headerTxt);
  if (sID == "") {
    sID = localStorage.getItem("openSelection");
    localStorage.removeItem("openSelection");
  }
  else
    localStorage.setItem("openSelection", sID);

  document.getElementById(sID).classList.toggle("hidden");
  
}
