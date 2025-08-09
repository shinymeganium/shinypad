// npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
function checkList(key) {
  if (JSON.parse(localStorage.getItem(key)) != null)
    return JSON.parse(localStorage.getItem(key));
  else
    return [];
}

// section id values
const selections = ["continueh", "newh", "targetl", "caughtl", "info"];

let targetPkmn = checkList("targetList");
let caughtPkmn = [];

// call on load if there is a current hunt id
function checkCurrentHunt() {
  if (JSON.parse(localStorage.getItem("currentHuntID")) != null) {
    let index = localStorage.getItem("currentHuntID");
    document.getElementById("idcard").innerHTML = targetPkmn[index][0];
    document.getElementById("pkmcard").innerHTML = targetPkmn[index][1];
    document.getElementById("methodcard").innerHTML = targetPkmn[index][2];
    document.getElementById("continuenav").classList.remove("hidden");
  }
}


// check if localstorage has something in it

// class Target {
//   constructor(name, method, count) {
//     this._name = name;
//     this._method = method;
//     this._encounters = count;
//   }
//   get name() {
//     return this._name;
//   }
//   set name(x) {
//     this._name = x;
//   }
//   get method() {
//     return this._method;
//   }
//   set method(x) {
//     this._method = x;
//   }
//   get count() {
//     return this._encounters;
//   }
//   set count(x) {
//     this._encounters = x;
//   }
// }

// class Pokemon extends Target {

// }

// debug function
// section name: string
// function showSection(sectionName) {
//   const element = document.getElementById(sectionName);
//   element.classList.toggle("hidden");
// }

// function testTarget() {
//   let test = new Target("asd", "zzz", 0);

//   console.log(test.name);
//   console.log(test.method);
//   console.log(test.count);

//   test = null;
// }

// for testing
function clearLS() {
  localStorage.clear();
  console.log("cleared localstorage");
}

// toggles selection's visibility, hides mobile nav bar, reveals nav icon
 function openSelection(sectionID) {
  document.getElementById(sectionID).classList.toggle("hidden");
  document.getElementById("nav").classList.toggle("hidden");
  document.getElementById("mobile-nav-icon").classList.toggle("hidden");
}

// not working, find out why
function toggleMultiple(selections) {
  for (let i = 0; i < selections.length; i++)
    document.getElementById(selections[i]).classList.toggle("hidden");
}

// manage mobile nav bar visibility
function showNavbar() {
  document.getElementById("nav").classList.toggle("hidden");

  // if an element is visible, hide it by toggling hidden class
  for (let i = 0; i < selections.length; i++) {
    if (!document.getElementById(selections[i]).classList.contains("hidden"))
      document.getElementById(selections[i]).classList.toggle("hidden");
  }
  document.getElementById("mobile-nav-icon").classList.toggle("hidden");

  // check if in current hunt there is no current hunt
  const pkmn = document.getElementById("pkm").innerHTML;
  if (pkmn != "" && document.getElementById("continue").classList.contains("hidden"))
    document.getElementById("continueh").classList.remove("hidden");
}

// add/substract to encounter count
function changeCount(symbol) {
  let num = Number(document.getElementById("countcard").innerHTML);
  if (symbol == '+') {
    document.getElementById("countcard").innerHTML = String(num + 1);
  }
  else if (symbol == '-') {
    document.getElementById("countcard").innerHTML = String(num - 1);
  }
}

// fetch data from new hunt form, return an array that has
// id, pokemon, method and date
function getFormData() {
  let data = [];
  let id = targetPkmn.length;
  let pokemon = document.getElementById("pkm").value;
  let method = document.getElementById("method").value;
  let date = document.getElementById("date").value;

  data.push(id, pokemon, method, 0, date);
  localStorage.setItem("currentHuntID", JSON.stringify(id));
  return data;
}

// set up hunt card data
function createHuntCard() {
  let target = getFormData();

  document.getElementById("idcard").innerHTML = target[0];
  document.getElementById("pkmcard").innerHTML = target[1];
  document.getElementById("methodcard").innerHTML = target[2];

  targetPkmn.push(target);
  localStorage.setItem("targetList", JSON.stringify(targetPkmn));
}

// close new hunt, open continue hunt, reset form
// save target to array, save array to localstorage
function showHuntCard() {
  createHuntCard();

  // change to ([]) ??
  //toggleMultiple("newh", "continueh", "continuenav");
  document.getElementById("newh").classList.toggle("hidden");
  document.getElementById("continueh").classList.toggle("hidden");
  if (JSON.parse(localStorage.getItem("currentHuntID")) != null)
    document.getElementById("continuenav").classList.remove("hidden");
  document.getElementById("pkmnform").reset();
}

function showTargetList() {
  let list = document.getElementById("tarl");
  
  if (targetPkmn.length > 0) {
    targetPkmn.forEach((x) => {
      let li = document.createElement("li");
      li.innerText = x[1];
      list.appendChild(li);
    });
  }
  else {
    let li = document.createElement("li");
      li.innerText = "list empty";
      list.appendChild(li);
  }
}

// debug func
function showTargetsInLS() {
  if (JSON.parse(localStorage.getItem("targetList")) != null)
    console.log(JSON.parse(localStorage.getItem("targetList")));
  else
    console.log("nothing");
}