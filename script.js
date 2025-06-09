function showScore() {
    document.getElementById("quiz-container").style.display = "none";
  
    // Create a container to enter username
    const container = document.createElement("div");
    container.style.textAlign = "center";
    container.innerHTML = `
      <h2>Your score: ${score} / ${quizData.length}</h2>
      <p>Enter your name to save your score:</p>
      <input type="text" id="username" placeholder="Your name" />
      <br/><br/>
      <button id="save-score-btn" disabled>Save Score</button>
      <div id="leaderboard" style="margin-top:30px;"></div>
    `;
  
    document.body.appendChild(container);
  
    const usernameInput = container.querySelector("#username");
    const saveScoreBtn = container.querySelector("#save-score-btn");
    const leaderboardDiv = container.querySelector("#leaderboard");
  
    usernameInput.addEventListener("input", () => {
      saveScoreBtn.disabled = usernameInput.value.trim() === "";
    });
  
    saveScoreBtn.addEventListener("click", () => {
      const playerName = usernameInput.value.trim();
  
      if (playerName === "") return;
  
      // Get previous leaderboard data from localStorage or empty array
      let leaderboard = JSON.parse(localStorage.getItem("quiz_leaderboard")) || [];
  
      // Add current score
      leaderboard.push({ name: playerName, score });
  
      // Sort by descending score
      leaderboard.sort((a, b) => b.score - a.score);
  
      // Keep top 5 scores
      leaderboard = leaderboard.slice(0, 5);
  
      // Save back to localStorage
      localStorage.setItem("quiz_leaderboard", JSON.stringify(leaderboard));
  
      // Show leaderboard
      displayLeaderboard(leaderboard, leaderboardDiv);
  
      // Disable inputs after saving
      usernameInput.disabled = true;
      saveScoreBtn.disabled = true;
    });
  }
  
  function displayLeaderboard(leaderboard, container) {
    if (leaderboard.length === 0) {
      container.innerHTML = "<p>No leaderboard data found.</p>";
      return;
    }
  
    let html = "<h3>Leaderboard (Top 5)</h3><ol>";
    leaderboard.forEach((entry) => {
      html += `<li>${entry.name} - ${entry.score}</li>`;
    });
    html += "</ol>";
  
    container.innerHTML = html;
  }
  
