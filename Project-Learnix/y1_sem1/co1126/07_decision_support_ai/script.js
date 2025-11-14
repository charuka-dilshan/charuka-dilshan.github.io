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

      // Answer Key for Module 07 (Decision Support & AI)
      const correctAnswers = {
        q1: "a", // Intelligence
        q2: "b", // Design
        q3: "d", // Implementation
        q4: "b", // Unstructured
        q5: "d", // Nonrecurring
        q6: "b", // improve effectiveness
        q7: "c", // Non-structured
        q8: "a", // Model Management
        q9: "b", // Data Management
        q10: "c", // GIS
        q11: "a", // AI
        q12: "a", // Expert System
        q13: "a", // Diagnostic
        q14: "b", // Prescriptive
        q15: "b", // Neural Network
        q16: "b", // Fraud detection
        q17: "c", // Genetic Algorithm
        q18: "c", // Optimizing systems
        q19: "c", // Software that acts on your behalf
        q20: "a", // Buyer Agent
        q21: "c", // Monitoring-and-Surveillance
        q22: "d", // Data-Mining Agent
        q23: "a", // mechanical device
        q24: "a", // Domain
        q25: "b", // Use common sense
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
