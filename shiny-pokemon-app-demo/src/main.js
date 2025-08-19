// npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
// check if there is data and is it list

class Target {
  constructor() {
    this.id = 0;
    this.pokemon = "";
    this.method = "";
    this.started = "";
    this.notes = "";
    this.encounters = 0;
  }
  setID() {
    if (localStorage.getItem("currentID") != null)
      this.id = Number(localStorage.getItem("currentID")) + 1;
    localStorage.setItem("currentID", JSON.stringify(this.id));
    return this.id;
  }
}

function getSavedData(key, isList) {
  if (localStorage.getItem(key) != null)
      return JSON.parse(localStorage.getItem(key));
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

function toggleNav(text, changeBtn) {
  document.getElementById("header-text").innerHTML = text;
  if (changeBtn) {
    document.getElementById("nav-mobile").classList.toggle("hidden");
    document.getElementById("header-b1").classList.toggle("hidden");
    document.getElementById("header-b2").classList.toggle("hidden");
  }
}

function toggleSelection(sID, headerTxt, changeBtn) {
  toggleNav(headerTxt, changeBtn);
  if (sID == "") {
    sID = localStorage.getItem("openSelection");
    localStorage.removeItem("openSelection");
  }
  else
    localStorage.setItem("openSelection", sID);

  document.getElementById(sID).classList.toggle("hidden");
  window.scrollTo(0,0);
}

function createNewTarget() {
  let target = new Target();
  target.id = target.setID();
  target.pokemon = document.getElementById("pkmn").value;
  target.method = document.getElementById("method").value;
  target.started = document.getElementById("started").value;
  target.notes = document.getElementById("notes").value;
  targets.push(target);
  localStorage.setItem("targets", JSON.stringify(targets));
  currentHunt = target;
  localStorage.setItem("currentHunt", JSON.stringify(target));

  return target;
}

function displayCurrentHunt(target) {
  document.getElementById("hunt-pkmn").innerHTML = target.pokemon;
  document.getElementById("hunt-method").innerHTML = target.method;
  document.getElementById("hunt-started").innerHTML = target.started;
  document.getElementById("hunt-count").innerHTML = target.encounters;
  document.getElementById("hunt-notes").innerHTML = target.notes;
}

function createCurrentHunt() {
  let target = createNewTarget();
  displayCurrentHunt(target);

  if (currentHunt != null)
    document.getElementById("nav-mobile-current").classList.remove("hidden");
  // if (currentHunt != null && target.length > 0)

  document.getElementById("s-new-hunt").classList.toggle("hidden");
  document.getElementById("form").reset();
  if (targets.length > 1)
    document.getElementById("nav-change-current").classList.remove("hidden");
  toggleSelection("s-current-hunt", "current hunt", false);
}

function checkCurrentHunt() {
  if (currentHunt != null) {
    displayCurrentHunt(currentHunt);
    document.getElementById("nav-mobile-current").classList.remove("hidden");
  }
  if (targets.length > 1)
    document.getElementById("nav-change-current").classList.remove("hidden");
}

function showTargetNotes() {
  document.getElementById('hunt-show').classList.toggle('hidden');
  document.getElementById('hunt-hide').classList.toggle('hidden');
  document.getElementById('hunt-notes').classList.toggle('hidden');
}

function changeEncounterCount(symbol) {
  if (symbol == "-")
    currentHunt.encounters -= 1;
  else if (symbol == "+")
    currentHunt.encounters += 1;
  document.getElementById("hunt-count").innerHTML = currentHunt.encounters;
  localStorage.setItem("currentHunt", JSON.stringify(currentHunt));
  targets[currentHunt.id].encounters = currentHunt.encounters;
  localStorage.setItem("targets", JSON.stringify(targets));
}

function stopCurrentHunt() {
  // shinies.push(currentHunt);
  // localStorage.setItem("shinies", JSON.stringify(shinies));
  // targets.splice(targets.indexOf(currentHunt));
  // localStorage.setItem("targets", JSON.stringify(targets));
  // currentHunt = null;
  // localStorage.removeItem("currentHunt");
  // document.getElementById("hunt-pkmn").innerHTML = "";
  // document.getElementById("hunt-method").innerHTML = "";
  // document.getElementById("hunt-started").innerHTML = "";
  // document.getElementById("hunt-count").innerHTML = "";
  // document.getElementById("hunt-notes").innerHTML = "";
  // document.getElementById("nav-mobile-current").classList.add("hidden");
  // if (targets.length < 2)
  //   document.getElementById("nav-change-current").classList.add("hidden");

  // toggleSelection('', 'navigation', true);
  //console.log(targets.indexOf(currentHunt));
}

function showList(listID, list, sID, headerTxt) {
  let htmlList = document.getElementById(listID);
  htmlList.innerHTML = "";

  if (list.length > 0) {
    list.forEach(pokemon => {
      let li = document.createElement("li");
      li.innerText = pokemon.pokemon;
      htmlList.appendChild(li);
    });
  }
  toggleSelection(sID, headerTxt, true);
}

function changeTarget(pkmid) {
  currentHunt = targets[pkmid];
  localStorage.setItem("currentHunt", JSON.stringify(currentHunt));
  document.getElementById("s-change-hunt").classList.toggle("hidden");
  displayCurrentHunt(currentHunt);
  toggleSelection("s-current-hunt", "current hunt", false);
}

function showChangeHunt(listID, sID, headerTxt, changeBtn) {
  let htmlList = document.getElementById(listID);
  htmlList.innerHTML = "";

  if (targets.length > 0) {
    targets.forEach(pokemon => {
      let btn = document.createElement("button");
      btn.addEventListener("click", function() { changeTarget(pokemon.id); });
      btn.setAttribute("class", "w-20 h-10 m-2 p-2 bg-gray-200 cursor-pointer");
      btn.textContent = pokemon.pokemon;
      let li = document.createElement("li");
      li.appendChild(btn);
      htmlList.appendChild(li);
    });
  }
  if (!changeBtn) {
    document.getElementById("s-current-hunt").classList.toggle("hidden");
  }
  toggleSelection(sID, headerTxt, changeBtn);
}

// ---------------------------------- DEBUG FUNCTIONS ----------------------------------
