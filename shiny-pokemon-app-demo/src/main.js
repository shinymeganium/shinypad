// npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

// NOTE: data saving only works currently if continue the hunt section is closed from header's x button
// or the pause button
// data will not be saved if page gets refreshed or closed
function checkList(key) {
  if (JSON.parse(localStorage.getItem(key)) != null)
    return JSON.parse(localStorage.getItem(key));
  else
    return [];
}

class Target {
  constructor(id, img, pokemon, method, date, count) {
    this.id = id;
    this.img = img;
    this.pokemon = pokemon;
    this.method = method;
    this.date = date;
    this.count = count;
  }
}

// section id values
const selections = ["curh", "newh", "targetl", "caughtl", "info"];
const headerTxt = ["continue hunt", "new hunt", "target list", "caught shinies", "info", "navigation"];

let targetPkmn = checkList("targetList");
let caughtPkmn = checkList("shinyList");
let currentPkmn = null;

// call on load if there is a current hunt id
function checkCurrentHunt() {
  if (JSON.parse(localStorage.getItem("currentH")) != null) {
    let currentH = JSON.parse(localStorage.getItem("currentH"));
    document.getElementById("idcard").innerHTML = currentH.id;
    document.getElementById("pkmcard").innerHTML = currentH.pokemon;
    document.getElementById("methodcard").innerHTML = currentH.method;
    document.getElementById("datecard").innerHTML = currentH.date;
    document.getElementById("countcard").innerHTML = currentH.count;
    document.getElementById("curnav").classList.toggle("hidden");
  }
  else
    console.log("data not found");
}

function setCurrentHunt(stop) {
  let currentH = JSON.parse(localStorage.getItem("currentH"));
  targetPkmn[currentH.id].count = currentH.count;
  localStorage.setItem("targetList", JSON.stringify(targetPkmn));

  if (stop)
    return currentH;
}

function toIndex() {
  window.location.href = "index.html";
}

function toggleSelections(arrayID) {
  document.getElementById(selections[arrayID]).classList.toggle("hidden");
  document.getElementById("close1").classList.toggle("hidden");
  document.getElementById("close2").classList.toggle("hidden");
  document.getElementById("nav").classList.toggle("hidden");
  document.getElementById("header-text").innerHTML = headerTxt[arrayID];
}

// manage mobile nav bar visibility
function showNavbar() {
  document.getElementById("close1").classList.toggle("hidden");
  document.getElementById("close2").classList.toggle("hidden");
  document.getElementById("header-text").innerHTML = headerTxt[headerTxt.length - 1];
  document.getElementById("nav").classList.toggle("hidden");
  document.getElementById("tarl").innerHTML = ""; // clear target list
  document.getElementById("shinyl").innerHTML = "";

  if (!document.getElementById("curh").classList.contains("hidden"))
    setCurrentHunt(false);

  // if an element is visible, hide it by toggling hidden class
  for (let i = 0; i < selections.length; i++) {
    if (!document.getElementById(selections[i]).classList.contains("hidden"))
      document.getElementById(selections[i]).classList.toggle("hidden");
  }
}

// add/substract to encounter count
function changeCount(symbol) {
  let currentH = JSON.parse(localStorage.getItem("currentH"));
  let count = Number(document.getElementById("countcard").innerHTML);

  if (symbol == "-") {
    count -= 1;
  }
  else if (symbol == "+") {
    count += 1;
  }

  document.getElementById("countcard").innerHTML = String(count);
  currentH.count = count;
  localStorage.setItem("currentH", JSON.stringify(currentH));
}

// save current hunt to caughtPkmn
function stopHunt() {
  let pokemon = setCurrentHunt(true);
  targetPkmn.splice(pokemon.id, 1);
  localStorage.setItem("targetList", JSON.stringify(targetPkmn));
  localStorage.removeItem("currentH");
  caughtPkmn.push(pokemon);
  localStorage.setItem("shinyList", JSON.stringify(caughtPkmn));
  document.getElementById("curnav").classList.toggle("hidden");
  
}

// fetch data from new hunt form, return an array that has
function getFormData() {
  let id = targetPkmn.length;
  let pokemon = document.getElementById("pkm").value;
  let method = document.getElementById("method").value;
  let date = document.getElementById("date").value;
  let data = new Target(id, 0, pokemon, method, date, 0);

  return data;
}

// set up hunt card data
function createHuntCard() {
  let target = getFormData();

  document.getElementById("idcard").innerHTML = target.id;
  document.getElementById("pkmcard").innerHTML = target.pokemon;
  document.getElementById("methodcard").innerHTML = target.method;
  document.getElementById("datecard").innerHTML = target.date;
  document.getElementById("countcard").innerHTML = target.count;

  targetPkmn.push(target);
  localStorage.setItem("currentH", JSON.stringify(target));
  localStorage.setItem("targetList", JSON.stringify(targetPkmn));
}

// close new hunt, open continue hunt, reset form
function showHuntCard() {
  createHuntCard();
  document.getElementById("newh").classList.toggle("hidden");
  document.getElementById("curh").classList.toggle("hidden");
  document.getElementById("curnav").classList.remove("hidden");
  document.getElementById("pkmnform").reset();
}

function showTargetList() {
  let list = document.getElementById("tarl");
  
  if (targetPkmn.length > 0) {
    targetPkmn.forEach((x) => {
      let li = document.createElement("li");
      li.innerText = x.pokemon;
      list.appendChild(li);
    });
  }
  else {
    let li = document.createElement("li");
      li.innerText = "list empty";
      list.appendChild(li);
  }
  toggleSelections(2);
}

function showShinyList() {
  let list = document.getElementById("shinyl");
  
  if (caughtPkmn.length > 0) {
    caughtPkmn.forEach((x) => {
      let li = document.createElement("li");
      li.innerText = x.pokemon;
      list.appendChild(li);
    });
  }
  else {
    let li = document.createElement("li");
      li.innerText = "list empty";
      list.appendChild(li);
  }
  toggleSelections(3);
}

// for testing--------------------------------------------------
function clearLS() {
  localStorage.clear();
  console.log("cleared localstorage");
}
// debug func
function showTargetsInLS() {
  if (JSON.parse(localStorage.getItem("targetList")) != null)
    console.log(JSON.parse(localStorage.getItem("targetList")));
  else
    console.log("nothing");
}
function showCurrentHuntInLS() {
  if (JSON.parse(localStorage.getItem("currentH")) != null)
    console.log(JSON.parse(localStorage.getItem("currentH")));
  else
    console.log("nothing");
}