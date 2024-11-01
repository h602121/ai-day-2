import { useState } from "react";

function MatchManager() {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState("");

  const addMatch = () => {
    setMatches([...matches, newMatch]);
    setNewMatch("");
  };

  return (
    <div>
      <h2>Match Manager</h2>
      <input
        type="text"
        value={newMatch}
        onChange={(e) => setNewMatch(e.target.value)}
        placeholder="New Match"
      />
      <button onClick={addMatch}>Add Match</button>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>{match}</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchManager;
