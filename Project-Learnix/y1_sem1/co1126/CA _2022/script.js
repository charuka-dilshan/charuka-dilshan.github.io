document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.getElementById("quizForm");
  const resultsDiv = document.getElementById("quizResults");

  // Data Structure: Correct Answer + Explanation for each question
  const quizData = {
    q1: { 
        correct: "a", 
        explanation: "Information systems collect, process, and analyze data to help managers make strategic decisions[cite: 3140]. This is their primary role in competitive advantage." 
    },
    q2: { 
        correct: "a", 
        explanation: "Valuable information must be complete. [cite_start]Ambiguity, inaccessibility, and redundancy are negative traits[cite: 3208]." 
    },
    q3: { 
        correct: "b", 
        explanation: "Differentiation strategy involves creating unique or high-quality products to stand out from competitors[cite: 4036]." 
    },
    q4: { 
        correct: "a", 
        explanation: "Threat of New Entrants refers to the ease or difficulty for new competitors to start business in the same market[cite: 3995]." 
    },
    q5: { 
        correct: "c", 
        explanation: "RAM stands for Random Access Memory[cite: 887]. It is volatile memory used for active processes." 
    },
    q6: { 
        correct: "b", 
        explanation: "Porter's Value Chain consists of Primary Activities (Inbound/Outbound Logistics, Operations, Marketing, Service) and Support Activities (Infra, HR, Tech Dev, Procurement). [cite_start]CRM is a strategy/system, not a specific Value Chain component[cite: 4060]." 
    },
    q7: { 
        correct: "d", 
        explanation: "The '.gov' TLD is reserved for government entities[cite: 3836]." 
    },
    q8: { 
        correct: "a", 
        explanation: "Outbound Logistics (delivering the product) is a Primary Activity. [cite_start]Technology, Infrastructure, and HR are Support Activities[cite: 4085]." 
    },
    q9: { 
        correct: "d", 
        explanation: "Digital infrastructures (networks, computers, software) provide the global platform for interaction in the digital economy[cite: 773]." 
    },
    q10: { 
        correct: "c", 
        explanation: "Inbound Logistics involves receiving and managing raw materials and inventory[cite: 4083]." 
    },
    q11: { 
        correct: "a", 
        explanation: "While gaming servers exist, the core internet servers discussed are Web, Mail, and FTP. [cite_start]'Gaming Server' is not typically listed as a fundamental infrastructure type in this context[cite: 3911]." 
    },
    q12: { 
        correct: "c", 
        explanation: "URL stands for Uniform Resource Locator, which is the address of a specific web page[cite: 3820]." 
    },
    q13: { 
        correct: "a", 
        explanation: "Antivirus software is a type of Utility Software used to maintain and protect the computer[cite: 957]." 
    },
    q14: { 
        correct: "a", 
        explanation: "Supplier Power is the ability of suppliers to influence the market by raising prices or reducing quality[cite: 4014]." 
    },
    q15: { 
        correct: "b", 
        explanation: "Supercomputers are the fastest, most powerful, and most expensive computers, used for complex calculations[cite: 835]." 
    },
    q16: { 
        correct: "a", 
        explanation: "Protocols are sets of rules that computers follow to transfer information effectively[cite: 3924]." 
    },
    q17: { 
        correct: "b", 
        explanation: "A Web browser is software that enables users to view websites and surf the World Wide Web[cite: 3844]." 
    },
    q18: { 
        correct: "b", 
        explanation: "Buyer Power refers to the ability of customers to drive prices down or demand better quality[cite: 4012]." 
    },
    q19: { 
        correct: "a", 
        explanation: "A Monitor is an Output device. [cite_start]Keyboards, scanners, and microphones are Input devices[cite: 860]." 
    },
    q20: { 
        correct: "b", 
        explanation: "Offering personalized shopping experiences uses technology to differentiate services, thus gaining a competitive advantage[cite: 4037]." 
    },
    q21: { 
        correct: "a", 
        explanation: "HTTP (Hypertext Transfer Protocol) is commonly used to transfer web pages and information over the Internet[cite: 3927]." 
    },
    q22: { 
        correct: "c", 
        explanation: "Data is raw facts; [cite_start]Information is data that has been organized to have meaning in a specific context[cite: 3147, 3149]." 
    },
    q23: { 
        correct: "a", 
        explanation: "Outbound Logistics is a Primary Activity. [cite_start]Tech Dev, HR, and Infrastructure are Support Activities[cite: 4085]." 
    },
    q24: { 
        correct: "b", 
        explanation: "The Threat of Substitute Products is assessed by how likely customers are to switch to alternatives that satisfy the same need[cite: 4004]." 
    },
    q25: { 
        correct: "d", 
        explanation: "The '.edu' TLD is reserved for educational institutions[cite: 3836]." 
    },
    q26: { 
        correct: "b", 
        explanation: "An ISP (Internet Service Provider) provides individuals and organizations access to the Internet[cite: 3903]." 
    },
    q27: { 
        correct: "a", 
        explanation: "Cost Leadership strategy focuses on becoming the low-cost producer in the industry[cite: 4031]." 
    },
    q28: { 
        correct: "d", 
        explanation: "Modern search engines use web crawlers (spiders) to scan the web and algorithms to index real-time information[cite: 3935]." 
    },
    q29: { 
        correct: "a", 
        explanation: "The CPU (Central Processing Unit) executes instructions and processes data[cite: 892]." 
    },
    q30: { 
        correct: "b", 
        explanation: "The TLD (like .com, .org) specifies the category or type of organization owning the domain[cite: 3832]." 
    },
    q31: { 
        correct: "a", 
        explanation: "The goal of competitive advantage is to outperform competitors and achieve superior profitability[cite: 3952]." 
    },
    q32: { 
        correct: "d", 
        explanation: "The Threat of New Entrants evaluates how easy or difficult it is for new competitors to enter the market[cite: 3995]." 
    },
    q33: { 
        correct: "c", 
        explanation: "An Operating System (OS) is classified as System Software, which manages hardware and other software[cite: 942]." 
    },
    q34: { 
        correct: "d", 
        explanation: "The Focus strategy involves concentrating on a narrow market segment or niche[cite: 4046]." 
    },
    q35: { 
        correct: "d", 
        explanation: "Feedback provides information about the system's operation to monitor and improve performance[cite: 3154]." 
    }
  };

  if (quizForm) {
    quizForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      let score = 0;
      const totalQuestions = Object.keys(quizData).length;

      // Clear previous styling and explanations
      resultsDiv.innerHTML = "";
      document.querySelectorAll(".explanation").forEach(e => e.remove());
      document.querySelectorAll(".question label").forEach((label) => {
        label.classList.remove("correct", "incorrect");
      });

      // Loop through each question
      for (const [questionId, data] of Object.entries(quizData)) {
        const questionElement = document.getElementById(questionId);
        const selected = document.querySelector(`input[name="${questionId}"]:checked`);
        const correctAnswer = data.correct;
        const explanationText = data.explanation;

        // Create Explanation Element
        const explanationDiv = document.createElement("div");
        explanationDiv.className = "explanation";
        explanationDiv.innerHTML = `<strong>Explanation:</strong> ${explanationText}`;

        if (selected) {
          const selectedLabel = selected.parentElement;
          if (selected.value === correctAnswer) {
            score++;
            selectedLabel.classList.add("correct");
            // Optional: Add "Correct!" text to explanation? 
            // For now, just appending explanation is cleaner.
          } else {
            selectedLabel.classList.add("incorrect");
            // Highlight the correct answer
            const correctLabel = document.querySelector(
              `input[name="${questionId}"][value="${correctAnswer}"]`
            ).parentElement;
            correctLabel.classList.add("correct");
          }
        } else {
            // If not answered, just highlight the correct one
            const correctLabel = document.querySelector(
              `input[name="${questionId}"][value="${correctAnswer}"]`
            ).parentElement;
            correctLabel.classList.add("correct");
        }

        // Append the explanation to the question container
        questionElement.appendChild(explanationDiv);
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