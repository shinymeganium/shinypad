// section name = string
function showSection(sectionName) {
  if (document.getElementById(sectionName).style.display == "none")
    document.getElementById(sectionName).style.display = "block";
  else //if (document.getElementById(sectionName).style.display == "block")
    document.getElementById(sectionName).style.display = "none";
  //document.getElementById(sectionName).style.display = "block"
}

