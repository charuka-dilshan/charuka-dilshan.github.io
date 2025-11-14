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

      // Answer Key for Module 08 (E-Business & E-Commerce)
      const correctAnswers = {
        q1: "b", // E-Business definition
        q2: "c", // EDI definition
        q3: "a", // EDI vs. Email
        q4: "d", // Common EDI docs
        q5: "b", // Standard format purpose
        q6: "b", // Intranet definition
        q7: "c", // Extranet definition
        q8: "a", // Extranet advantage
        q9: "d", // E-Comm adv for Org
        q10: "a", // E-Comm adv for Cust
        q11: "c", // E-Comm adv for Society
        q12: "b", // B2B
        q13: "a", // B2C
        q14: "c", // C2C
        q15: "c", // MRO definition
        q16: "a", // Direct Materials
        q17: "d", // Digital product
        q18: "b", // B2C payment
        q19: "a", // E-Government definition
        q20: "d", // G2B (not a strategy)
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
