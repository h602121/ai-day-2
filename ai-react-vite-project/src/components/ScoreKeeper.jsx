import { useState } from "react";

function ScoreKeeper() {
  const [score, setScore] = useState({ team1: 0, team2: 0 });

  const incrementScore = (team) => {
    setScore((prevScore) => ({
      ...prevScore,
      [team]: prevScore[team] + 1,
    }));
  };

  return (
    <div>
      <h2>Score Keeper</h2>
      <div>
        <p>Team 1: {score.team1}</p>
        <p>Team 2: {score.team2}</p>
        <button onClick={() => incrementScore("team1")}>
          Increment Team 1
        </button>
        <button onClick={() => incrementScore("team2")}>
          Increment Team 2
        </button>
      </div>
    </div>
  );
}

export default ScoreKeeper;
