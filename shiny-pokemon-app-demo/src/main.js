const selections = ["continueh", "newh", "targetl", "caughtl", "info"];

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
  const method = document.getElementById("method").innerHTML;
  if (pkmn != "")
    document.getElementById("continuenav").classList.toggle("hidden");
}

// collect data from form, close current selection, open another
function createHuntCard() {
  let pokemon = document.getElementById("pkm").value;
  let method = document.getElementById("method").value;

  document.getElementById("pkmcard").innerHTML = "Pokémon:" + pokemon;
  document.getElementById("methodcard").innerHTML = "Method: " + method;

  document.getElementById("newh").classList.toggle("hidden");
  document.getElementById("continueh").classList.toggle("hidden");
} // continue hunt doesn't show up after creating a new hunt card