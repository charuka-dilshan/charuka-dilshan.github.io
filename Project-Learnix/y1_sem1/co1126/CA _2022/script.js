document.addEventListener("DOMContentLoaded", function () {
  // --- Quiz Logic ---
  const quizForm = document.getElementById("quizForm");
  const resultsDiv = document.getElementById("quizResults");

  if (quizForm) {
    quizForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      // Answer Key based on CA 2022
      const correctAnswers = {
        q1: "a", // Informed strategic decisions
        q2: "a", // Completeness
        q3: "b", // Differentiation
        q4: "a", // Potential for new competitors
        q5: "c", // Random Access Memory
        q6: "b", // Customer Relationship Management
        q7: "d", // Government entity
        q8: "a", // Outbound Logistics
        q9: "d", // Digital infrastructures
        q10: "c", // Manage raw materials
        q11: "a", // Gaming Server
        q12: "c", // Uniform Resource Locator
        q13: "a", // Antivirus software
        q14: "a", // Ability of suppliers to increase prices
        q15: "b", // Fastest and most powerful
        q16: "a", // Set rules for data transfer
        q17: "b", // Enable users to surf WWW
        q18: "b", // Ability of customers to negotiate
        q19: "a", // Monitor (Output device)
        q20: "b", // Personalized online shopping
        q21: "a", // HTTP
        q22: "c", // Data is raw, info is organized
        q23: "a", // Outbound Logistics (Duplicate)
        q24: "b", // Likelihood of switching
        q25: "d", // Educational institution
        q26: "b", // Provide access to Internet
        q27: "a", // Providing lowest prices
        q28: "d", // Web crawler collecting real-time info
        q29: "a", // Execute instructions
        q30: "b", // Specifying category of organization
        q31: "a", // Outperform competitors
        q32: "d", // Threat of new entrants
        q33: "c", // System Software
        q34: "d", // Concentrating on narrow segment
        q35: "d", // Monitor and improve performance
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