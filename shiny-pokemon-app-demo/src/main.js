// section id values
const selections = ["continueh", "newh", "targetl", "caughtl", "info"];

let targetPkmn = [];
let caughtPkmn = [];

class Target {
  constructor(name, method) {
    this.name = name;
    this.method = method;
  }
}

class Pokemon extends Target {

}

// debug function
// section name: string
// function showSection(sectionName) {
//   const element = document.getElementById(sectionName);
//   element.classList.toggle("hidden");
// }

 function openSelection(sectionID) {
  document.getElementById(sectionID).classList.toggle("hidden");
  document.getElementById("nav").classList.add("hidden");
  document.getElementById("mobile-nav-icon").classList.toggle("hidden");
}

// manage mobile nav bar visibility
function showNavbar() {
  document.getElementById("nav").classList.remove("hidden");

  // if an element is visible, hide it by toggling hidden class
  for (let i = 0; i < selections.length; i++) {
    if (!document.getElementById(selections[i]).classList.contains("hidden")) {
      
      document.getElementById(selections[i]).classList.add("hidden");
    }
  }
  document.getElementById("mobile-nav-icon").classList.toggle("hidden");

  // check if in current hunt there is no current hunt
  const pkmn = document.getElementById("pkm").innerHTML;
  if (pkmn != "" && document.getElementById("continue").classList.contains("hidden"))
    document.getElementById("continueh").classList.remove("hidden");
}

// collect data from form, close new hunt, open continue hunt
function createHuntCard() {
  let pokemon = document.getElementById("pkm").value;
  let method = document.getElementById("method").value;

  localStorage.setItem();

  document.getElementById("pkmcard").innerHTML = "Pokémon:" + pokemon;
  document.getElementById("methodcard").innerHTML = "Method: " + method;

  document.getElementById("newh").classList.toggle("hidden");
  document.getElementById("continueh").classList.toggle("hidden");
  document.getElementById("continuenav").classList.toggle("hidden");
  document.getElementById("pkmnform").reset(); 
}