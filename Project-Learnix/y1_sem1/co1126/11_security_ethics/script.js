document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Tab Navigation Logic ---
  const navButtons = document.querySelectorAll(".nav-btn");
  const contentItems = document.querySelectorAll(".content-item");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get the target content ID
      const targetId = button.getAttribute("data-content");
      const targetContent = document.getElementById(targetId);

      // Reset all buttons and contents
      navButtons.forEach((btn) => btn.classList.remove("active"));
      contentItems.forEach((item) => item.classList.remove("active"));

      // Activate the clicked button and target content
      button.classList.add("active");
      targetContent.classList.add("active");
    });
  });

  // --- 2. Quiz Logic ---
  const quizForm = document.getElementById("quizForm");
  const resultsDiv = document.getElementById("quizResults");

  if (quizForm) {
    quizForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      // Answer Key for Module 11 (Security & Ethics)
      const correctAnswers = {
        q1: "a", // Ethics def
        q2: "c", // Copyright def
        q3: "a", // True
        q4: "d", // Privacy def
        q5: "a", // Key logger def
        q6: "c", // EDR def
        q7: "d", // Phishing def
        q8: "b", // Pharming def
        q9: "a", // Cyberslacking def
        q10: "d", // All of the above
        q11: "c", // Cookie def
        q12: "b", // Spam def
        q13: "a", // Spyware def
        q14: "d", // Trojan Horse def
        q15: "b", // Clickstream def
        q16: "a", // Carnivore def
        q17: "c", // Echelon def
        q18: "d", // HIPAA def
        q19: "a", // Employee misconduct
        q20: "c", // Hacker def
        q21: "b", // Worm def
        q22: "d", //Do-S def
        q23: "a", // Can't hurt hardware
        q24: "c", // Firewall def
        q25: "b", // PKE def
      };

      let score = 0;
      const totalQuestions = Object.keys(correctAnswers).length;

      // Clear previous styling
      resultsDiv.innerHTML = "";
      document.querySelectorAll(".question label").forEach((label) => {
        label.classList.remove("correct", "incorrect");
      });

      // Check answers
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
            // Highlight the correct answer if wrong one selected
            const correctLabel = document.querySelector(
              `input[name="${question}"][value="${answer}"]`
            ).parentElement;
            correctLabel.classList.add("correct");
          }
        }
      }

      // Show Score
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
