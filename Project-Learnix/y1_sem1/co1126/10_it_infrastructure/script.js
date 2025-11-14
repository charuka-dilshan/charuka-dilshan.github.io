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

      // Answer Key for Module 10 (IT Infrastructures)
      const correctAnswers = {
        q1: "a", // Hardware, Software, Telecom
        q2: "c", // VoIP
        q3: "b", // Client/Server
        q4: "b", // 2-Tier
        q5: "b", // Application Server and Data Server
        q6: "c", // Intranet
        q7: "a", // Extranet
        q8: "b", // Digital Dashboard
        q9: "a", // Integration definition
        q10: "c", // Interoperability
        q11: "a", // .NET
        q12: "c", // ASP definition
        q13: "a", // Workflow System
        q14: "b", // Server Farm
        q15: "b", // NAS vs SAN
        q16: "a", // Collocation
        q17: "b", // Recovery
        q18: "a", // Disaster Recovery Plan
        q19: "d", // Hot Site
        q20: "b", // Cold Site
        q21: "a", // Availability
        q22: "b", // Accessibility
        q23: "c", // Reliability
        q24: "d", // Scalability
        q25: "a", // Benchmarks
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
