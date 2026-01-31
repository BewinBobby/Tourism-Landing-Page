filterSelection("all");

function filterSelection(category) {
  const cards = document.querySelectorAll(".card");

  if (category === "all") category = "";

  cards.forEach(card => {

    card.classList.remove("hidden");

    if (card.className.indexOf(category) > -1) {

      // Bring card back smoothly
      card.classList.remove("slide-out");
      setTimeout(() => {
        card.classList.add("slide-in");
      }, 100);


    } else {

      // Slide it out
      card.classList.remove("slide-in");
      card.classList.add("slide-out");

      // Remove from layout after animation
      setTimeout(() => {
        card.classList.add("hidden");
      }, 450);
    }

  });
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("btncontainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// JavaScript to clone the first set of team cards and append them to create an infinite loop
const teamSlider = document.querySelector('.team-slider');
const firstSet = teamSlider.innerHTML;
teamSlider.innerHTML += firstSet;

var btnContainer = document.getElementById("btncontainer");
var btns = btnContainer.getElementsByClassName("btn");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
