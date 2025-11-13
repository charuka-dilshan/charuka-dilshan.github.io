// JavaScript for the module page
// Place this in co1121/01_indices/script.js

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Tab Navigation Logic ---
  const navButtons = document.querySelectorAll(".nav-btn");
  const contentItems = document.querySelectorAll(".content-item");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-content");
      const targetContent = document.getElementById(targetId);

      navButtons.forEach((btn) => btn.classList.remove("active"));
      contentItems.forEach((item) => item.classList.remove("active"));

      button.classList.add("active");
      targetContent.classList.add("active");
    });
  });

  // --- 2. Quiz Logic ---
  const quizForm = document.getElementById("quizForm");
  const resultsDiv = document.getElementById("quizResults");

  if (quizForm) {
    quizForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Stop the page from reloading

      // THIS IS THE CORRECTED OBJECT:
      const correctAnswers = {
        q1: "b", // a^{m+n}
        q2: "c", // 1/a^n
        q3: "c", // 1
        q4: "b", // x = -3
        q5: "c", // a^6
      };
      // END OF FIX

      let score = 0;
      const totalQuestions = Object.keys(correctAnswers).length;

      // Clear previous results
      resultsDiv.innerHTML = "";
      document.querySelectorAll(".question label").forEach((label) => {
        label.classList.remove("correct", "incorrect");
      });

      // Check each answer
      for (const [question, answer] of Object.entries(correctAnswers)) {
        const selected = document.querySelector(
          `input[name="${question}"]:checked`
        );

        if (selected) {
          const selectedLabel = selected.parentElement;
          if (selected.value === answer) {
            score++;
            selectedLabel.classList.add("correct");
          } else {
            selectedLabel.classList.add("incorrect");
            // Also show the correct answer
            const correctLabel = document.querySelector(
              `input[name="${question}"][value="${answer}"]`
            ).parentElement;
            correctLabel.classList.add("correct");
          }
        }
      }

      // Display the final score
      resultsDiv.innerHTML = `You scored ${score} out of ${totalQuestions}.`;
      resultsDiv.style.display = "block";

      if (score === totalQuestions) {
        resultsDiv.className = "quiz-results correct";
      } else {
        resultsDiv.className = "quiz-results incorrect";
      }
    });
  }
});
    