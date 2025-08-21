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

function toggleSelection(sID, navID = "navmobile") {
  document.getElementById(sID).classList.toggle("hidden");
  
  if (navID != "") {
    document.getElementById(navID).classList.toggle("hidden");
    document.getElementById("title").classList.toggle("hidden");
    document.getElementById("maincontent").classList.toggle("bg-susylightgray");
  }
}

function toggleBig(sID) {
  document.getElementById("maincontent").classList.toggle("xl:hidden");
  document.getElementById(sID).classList.toggle("hidden");
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

  document.getElementById("newhunt").classList.toggle("hidden");
  
    if (window.matchMedia("(width < 64rem)")) {
      toggleSelection("currenthunt", "");
    }
    else {
      toggleBig("currenthunt");
    }
  }

function checkCurrentHunt() {
  if (currentHunt != null) {
    displayCurrentHunt(currentHunt);
    //document.getElementById("nav-mobile-current").classList.remove("hidden");
  }
  // else {
  //   if (!document.getElementById("nav-mobile-current").classList.contains("hidden"))
  //     document.getElementById("nav-mobile-current").classList.toggle("hidden");
  // }
  // if (targets.length > 1)
  //   document.getElementById("nav-change-current").classList.remove("hidden");
}

function showTargetNotes() {
  document.getElementById('hunt-show').classList.toggle('hidden');
  document.getElementById('hunt-hide').classList.toggle('hidden');
  document.getElementById('hunt-notes').classList.toggle('hidden');
}

function changeCount(symbol) {
  if (symbol == "-")
    currentHunt.encounters -= 1;
  else if (symbol == "+")
    currentHunt.encounters += 1;
  document.getElementById("hunt-count").innerHTML = currentHunt.encounters;
  localStorage.setItem("currentHunt", JSON.stringify(currentHunt));
  targets[currentHunt.id].encounters = currentHunt.encounters;
  localStorage.setItem("targets", JSON.stringify(targets));
}

//// broken
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

function showList(listID, list, sID) {
  let htmlList = document.getElementById(listID);
  htmlList.innerHTML = "";

  if (list.length > 0) {
    list.forEach(pokemon => {
      let li = document.createElement("li");
      li.innerText = pokemon.pokemon;
      htmlList.appendChild(li);
    });
  }

  if (window.matchMedia("(width < 64rem)")) {
      toggleSelection(sID);
    }
    else {
      toggleBig("currenthunt");
    }
  
}

// document.getElementById("changehuntbtn").addEventListener("click", () => showList("targets", targets, "changehunt"));

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

// -----------------------------------------------------

// Modernized dragElement function using current standards and best practices
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  function closeDragElement() {
    // Remove the event listeners when mouse button is released:
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }

  function elementDrag(e) {
    // Ensure the event is a MouseEvent
    e.preventDefault();
    // Calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set the element's new position:
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  }

  function dragMouseDown(e) {
    // Only left mouse button should trigger drag
    if (e.button !== 0) return;
    e.preventDefault();
    // Get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  }

  // Use querySelector for better flexibility
  const header = document.getElementById(`${elmnt.id}header`);
  if (header) {
    header.addEventListener('mousedown', dragMouseDown);
  } else {
    elmnt.addEventListener('mousedown', dragMouseDown);
  }
}

// Use media query with modern syntax and listen for changes
const mql = window.matchMedia("(width >= 64rem)");

function enableDragIfWide(e) {
  if (e.matches) {
    const mainContent = document.getElementById("maincontent");
    if (mainContent) {
      dragElement(mainContent);
    }
    console.log(e.matches);
  }
}

enableDragIfWide(mql);
mql.addEventListener('change', enableDragIfWide);

// ---------------------------------- DEBUG FUNCTIONS ----------------------------------
