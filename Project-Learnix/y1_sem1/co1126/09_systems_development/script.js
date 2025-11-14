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

      // Answer Key for Module 09 (Systems Development)
      const correctAnswers = {
        q1: "b", // Systems Development Life Cycle
        q2: "a", // Plan
        q3: "a", // Critical Success Factor
        q4: "b", // Analysis
        q5: "b", // JAD definition
        q6: "b", // Design
        q7: "c", // Design
        q8: "b", // Develop
        q9: "c", // UAT definition
        q10: "b", // Implement
        q11: "c", // Maintain
        q12: "c", // 80%
        q13: "b", // Feature Creep
        q14: "a", // Scope Creep
        q15: "d", // Hardware is too expensive
        q16: "a", // Insourcing
        q17: "b", // Selfsourcing
        q18: "c", // Advantage of Selfsourcing
        q19: "c", // Outsourcing
        q20: "c", // Disadvantage of Outsourcing
        q21: "c", // Prototype definition
        q22: "a", // Proof-of-concept
        q23: "b", // Selling prototype
        q24: "c", // Advantage of Prototyping
        q25: "d", // Disadvantage of Prototyping
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
