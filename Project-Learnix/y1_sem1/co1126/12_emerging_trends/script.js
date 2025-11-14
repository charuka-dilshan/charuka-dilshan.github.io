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

      // Answer Key for Module 12 (Emerging Trends)
      const correctAnswers = {
        q1: "a", // Push vs Pull
        q2: "b", // Info Supplier Convergence
        q3: "b", // Speech Understanding
        q4: "a", // Biometrics
        q5: "c", // Virtual Reality
        q6: "b", // CAVE def
        q7: "b", // Holographic def
        q8: "a", // Portability vs Mobility
        q9: "b", // Micro-payments
        q10: "a", // Financial Cybermediary
        q11: "a", // Wearable Computer
        q12: "b", // Implant Chip
        q13: "c", // GPS def
        q14: "b", // Last-mile bottleneck
        q15: "a", // Digital Cash
        q16: "a", // G2G
        q17: "b", // G2B
        q18: "c", // G2C
        q19: "d", // IG2G
        q20: "c", // C2C
        q21: "b", // Digital Divide
        q22: "b", // Privacy vs Convenience
        q23: "b", // False (Understanding > Recognition)
        q24: "d", // All of the above
        q25: "a", // Ethics
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
