// npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

// INSTEAD OF CLOSING EVERY DIV ALWAYS, JUST RELOAD THE PAGE WHEN U CLOSE A SECTION
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
const selections = ["continueh", "newh", "targetl", "caughtl", "info"];
const headerTxt = ["continue hunt", "new hunt", "target list", "caught shinies", "info", "navigation"];

let targetPkmn = checkList("targetList");
let caughtPkmn = [];

// call on load if there is a current hunt id
function checkCurrentHunt() {
  if (JSON.parse(localStorage.getItem("currentHuntID")) != null) {
    let index = localStorage.getItem("currentHuntID");
    document.getElementById("idcard").innerHTML = targetPkmn[index].id;
    document.getElementById("pkmcard").innerHTML = targetPkmn[index].pokemon;
    document.getElementById("methodcard").innerHTML = targetPkmn[index].method;
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

// not working, find out why
function toggleMultiple(selections) {
  for (let i = 0; i < selections.length; i++)
    document.getElementById(selections[i]).classList.toggle("hidden");
}

// manage mobile nav bar visibility
function showNavbar() {
  document.getElementById("close1").classList.toggle("hidden");
  document.getElementById("close2").classList.toggle("hidden");
  document.getElementById("header-text").innerHTML = headerTxt[headerTxt.length - 1];
  document.getElementById("nav").classList.toggle("hidden");
  document.getElementById("tarl").innerHTML = ""; // clear target list

  // if an element is visible, hide it by toggling hidden class
  for (let i = 0; i < selections.length; i++) {
    if (!document.getElementById(selections[i]).classList.contains("hidden"))
      document.getElementById(selections[i]).classList.toggle("hidden");
  }
}

// add/substract to encounter count
function changeCount(symbol) {
  let num = Number(document.getElementById("countcard").innerHTML);
  let id = JSON.parse(localStorage.getItem("currentHuntID"));
  if (symbol == '+') {
    document.getElementById("countcard").innerHTML = String(num + 1);
    targetPkmn[id].count = num;
  }
  else if (symbol == '-') {
    document.getElementById("countcard").innerHTML = String(num - 1);
    targetPkmn[id].count = num;
  }
  localStorage.setItem("targetList", JSON.stringify(targetPkmn));
  console.log(targetPkmn[id].count);
}

// fetch data from new hunt form, return an array that has
// id, pokemon, method and date
function getFormData() {
  // let data = [];
  let id = targetPkmn.length;
  let pokemon = document.getElementById("pkm").value;
  let method = document.getElementById("method").value;
  let date = document.getElementById("date").value;
  let data = new Target(id, 0, pokemon, method, date, 0);

  localStorage.setItem("currentHuntID", JSON.stringify(data.id));
  return data;
}

// set up hunt card data
function createHuntCard() {
  let target = getFormData();

  document.getElementById("idcard").innerHTML = target.id;
  document.getElementById("pkmcard").innerHTML = target.pokemon;
  document.getElementById("methodcard").innerHTML = target.method;
  document.getElementById("countcard").innerHTML = target.count;

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

// debug func
function showTargetsInLS() {
  if (JSON.parse(localStorage.getItem("targetList")) != null)
    console.log(JSON.parse(localStorage.getItem("targetList")));
  else
    console.log("nothing");
}