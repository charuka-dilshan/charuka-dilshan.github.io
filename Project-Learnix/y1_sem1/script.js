// JavaScript for the search functionality
// Place this in y1_sem1/script.js

function searchSubjects() {
  // 1. Get all the necessary elements
  let input = document.getElementById("searchBar");
  let filter = input.value.toLowerCase();
  let grid = document.getElementById("subjectGrid");
  let cards = grid.getElementsByClassName("subject-card");

  // 2. Loop through all the subject cards
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    // Find the text elements inside the card (h3 and p)
    let title = card.querySelector("h3");
    let code = card.querySelector("p");

    // Get the text content from the title and code
    let titleText = title.textContent || title.innerText;
    let codeText = code.textContent || code.innerText;

    // 3. Check if the search text matches the title OR the code
    if (
      titleText.toLowerCase().indexOf(filter) > -1 ||
      codeText.toLowerCase().indexOf(filter) > -1
    ) {
      // If it matches, show the card
      card.style.display = "";
    } else {
      // If it doesn't match, hide the card
      card.style.display = "none";
    }
  }
}

/* --- Add this code to the end of y1_sem1/script.js --- */

// --- Timetable Modal Logic ---

// 1. Get all the elements we need
var modal = document.getElementById("imageModal");
var timetableCard = document.getElementById("openTimetable");
var modalImg = document.getElementById("timetableImage");
var captionText = document.getElementById("caption");
var closeButton = document.getElementsByClassName("close")[0];

// 2. When the user clicks the "View Timetable" card
timetableCard.onclick = function () {
  modal.style.display = "block";
  modalImg.src = "timetable.jpg"; // Set the image source
  captionText.innerHTML = "Year 1, Semester 1 Timetable";
};

// 3. When the user clicks on the 'x' (close button)
closeButton.onclick = function () {
  modal.style.display = "none";
};

// 4. When the user clicks on the modal background (not the image)
modal.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
