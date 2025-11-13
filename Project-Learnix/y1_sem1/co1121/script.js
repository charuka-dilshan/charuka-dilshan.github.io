// JavaScript for the search functionality
// Place this in co1121/script.js

function searchModules() {
  // 1. Get all the necessary elements
  let input = document.getElementById("searchBar");
  let filter = input.value.toLowerCase();
  let grid = document.getElementById("moduleGrid");
  let cards = grid.getElementsByClassName("module-card");

  // 2. Loop through all the module cards
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    // Find the title text element
    let title = card.querySelector("h3");
    let titleText = title.textContent || title.innerText;

    // 3. Check if the search text matches the title
    if (titleText.toLowerCase().indexOf(filter) > -1) {
      // If it matches, show the card
      card.style.display = "";
    } else {
      // If it doesn't match, hide the card
      card.style.display = "none";
    }
  }
}
