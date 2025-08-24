// npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

// object that holds information about the target
class Target {
  constructor() {
    this.id = 0;
    this.pokemon = "";
    this.method = "";
    this.started = "";
    this.notes = "";
    this.encounters = 0;
  }
  // so every pokemon would have a unique id, whenever a new target is created
  // store the id to local storage
  setID() {
    if (localStorage.getItem("currentID") != null)
      this.id = Number(localStorage.getItem("currentID")) + 1;
    localStorage.setItem("currentID", JSON.stringify(this.id));
    return this.id;
  }
}

// get data from local storage or if the key is empty return an empty list/null
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

// set variable values
let targets = getSavedData("targets", true);
let shinies = getSavedData("shinies", true);
let currentHunt = getSavedData("currentHunt", false);

// toggle selections on small screen
function toggleSelection(sID, navID = "navmobile") {
  document.getElementById(sID).classList.toggle("hidden");
  
  if (navID != "") {
    document.getElementById(navID).classList.toggle("hidden");
    document.getElementById("title").classList.toggle("hidden");
    document.getElementById("maincontent").classList.toggle("bg-susylightgray");
  }
}

// toggle selections on bigger screen
function toggleBig(sID) {
  document.getElementById("maincontent").classList.toggle("lg:hidden");
  document.getElementById(sID).classList.toggle("hidden");
}

// create a new target, collect the values from the form
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

// display the info of a target
function displayCurrentHunt(target, pkm = "hunt-pkmn", method = "hunt-method", started = "hunt-started", count = "hunt-count", notes = "hunt-notes") {
  if (target != null) {
    document.getElementById(pkm).innerHTML = target.pokemon;
    document.getElementById(method).innerHTML = target.method;
    document.getElementById(started).innerHTML = target.started;
    document.getElementById(count).innerHTML = target.encounters;
    document.getElementById(notes).innerHTML = target.notes;
  }
}

// call the required functions to create a new target and display it in current hunt
function createCurrentHunt() {
  let target = createNewTarget();
  displayCurrentHunt(target);

  document.getElementById("newhunt").classList.toggle("hidden");
  document.getElementById("form").reset();
  
    if (window.matchMedia("(width < 72rem)"))
      toggleSelection("currenthunt", "");
    else
      toggleBig("currenthunt");
  }

// called on page load, display current hunt
function checkCurrentHunt() {
  if (currentHunt != null)
    displayCurrentHunt(currentHunt);

}

// toggle show notes in current hunt
function showTargetNotes() {
  document.getElementById('hunt-show').classList.toggle('hidden');
  document.getElementById('hunt-hide').classList.toggle('hidden');
  document.getElementById('hunt-notes').classList.toggle('hidden');
}

// add or reduce encounters, save to ls to prevent data loss
function changeCount(symbol) {
  if (currentHunt != null) {
    if (symbol == "-")
      currentHunt.encounters -= 1;
    else if (symbol == "+")
      currentHunt.encounters += 1;
    document.getElementById("hunt-count").innerHTML = currentHunt.encounters;
    localStorage.setItem("currentHunt", JSON.stringify(currentHunt));
    targets[targets.findIndex(obj => obj.id === currentHunt.id)].encounters = currentHunt.encounters;
    localStorage.setItem("targets", JSON.stringify(targets));
  }
}

// stop the current hunt; remove target from targets list and add it to shinies list
function stopCurrentHunt() {
  if (currentHunt != null) {
    shinies.push(currentHunt);
    targets.splice(targets.findIndex(obj => obj.id === currentHunt.id), 1);
    localStorage.setItem("shinies", JSON.stringify(shinies));
    localStorage.setItem("targets", JSON.stringify(targets));
    currentHunt = null;
    localStorage.removeItem("currentHunt");
    document.getElementById("hunt-pkmn").innerHTML = "";
    document.getElementById("hunt-method").innerHTML = "";
    document.getElementById("hunt-started").innerHTML = "";
    document.getElementById("hunt-count").innerHTML = "";
    document.getElementById("hunt-notes").innerHTML = "";
    document.getElementById("currenthunt").classList.toggle("hidden");
    document.getElementById("navmobile").classList.toggle("hidden");
    document.getElementById("title").classList.toggle("hidden");
    document.getElementById("maincontent").classList.toggle("bg-susylightgray");
  }
}

// changes the current hunt
function changeHunt(pkmid) {
  currentHunt = targets[targets.findIndex(obj => obj.id === pkmid)];
  localStorage.setItem("currentHunt", JSON.stringify(currentHunt));
  displayCurrentHunt(currentHunt);
  document.getElementById("currenthunt").classList.toggle("hidden");
  document.getElementById("changehunt").classList.toggle("hidden");
}

// open showcase, toggle() doesnt work on list sections
function showPokemon(target, pkm, method, date, count, notes) {
  displayCurrentHunt(target, pkm, method, date, count, notes);
  if (document.getElementById("targetlist").classList.contains != "hidden")
    document.getElementById("targetlist").classList.add("hidden");
  if (document.getElementById("shinylist").classList.contains != "hidden")
    document.getElementById("shinylist").classList.add("hidden");
  document.getElementById("showcase").classList.toggle("hidden");
}

// shows targets and shinies lists as buttons or a message if a list is empty
function showList(listID, list, sID, change = false) {
  let htmlList = document.getElementById(listID);
  htmlList.innerHTML = "";

  if (list.length > 0) {
    list.forEach(pokemon => {
        let btn = document.createElement("button");
        btn.textContent = pokemon.pokemon;
        btn.setAttribute("class", "w-40 h-10 mb-2 rounded-2xl bg-gray-400 text-white cursor-pointer hover:bg-susyblue");
        
        if (change) {
          btn.addEventListener("click",  function() { changeHunt(pokemon.id); });
        }
        else {
          btn.addEventListener("click",  function() { showPokemon(pokemon, "showpkmn", "showmethod", "showdate", "showcount", "shownotes"); });
        }
        let li = document.createElement("li");
        li.appendChild(btn);
        htmlList.appendChild(li);
      });
  }
  else {
    htmlList.classList.add("font-sans");
    htmlList.classList.add("text-lg");
    htmlList.innerHTML = "nothing here!";
  }

  if (window.matchMedia("(max-width: 72rem)").matches)
    toggleSelection(sID);
  else
    toggleBig(sID);
}

// ----------------------------------------------------------------------
// drag element code from w3schools after copilot modernized it
// ----------------------------------------------------------------------

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
const mql = window.matchMedia("(width >= 72rem)");

function enableDragIfWide(e) {
  if (e.matches) {
    const mainContent = document.getElementById("maincontent");
    if (mainContent) {
      dragElement(mainContent);
    }
  }
}

enableDragIfWide(mql);
mql.addEventListener('change', enableDragIfWide);