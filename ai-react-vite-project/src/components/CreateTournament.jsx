import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TournamentContext } from "../components/TournamentManager";
import "../styling/CreateTournament.css";

function CreateTournament() {
  const { addTournament } = useContext(TournamentContext);
  const [newTournament, setNewTournament] = useState({
    name: "",
    format: "",
    scoringFormat: "",
    players: [],
  });
  const [currentPlayer, setCurrentPlayer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const tournament = {
      ...newTournament,
      status: "Ongoing",
      dateCreated: new Date().toLocaleDateString(),
    };
    addTournament(tournament);
    navigate("/");
  };

  const handleFormatChange = (format) => {
    setNewTournament({ ...newTournament, format });
  };

  const handleScoringFormatChange = (scoringFormat) => {
    setNewTournament({ ...newTournament, scoringFormat });
  };

  const addPlayer = () => {
    if (currentPlayer.trim()) {
      setNewTournament({
        ...newTournament,
        players: [...newTournament.players, currentPlayer.trim()],
      });
      setCurrentPlayer("");
    }
  };

  return (
    <div>
      <h2>Create Tournament</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTournament.name}
          onChange={(e) =>
            setNewTournament({ ...newTournament, name: e.target.value })
          }
          placeholder="Tournament Name"
          required
        />
        <div>
          <p>Format:</p>
          <button
            type="button"
            className={newTournament.format === "Americano" ? "selected" : ""}
            onClick={() => handleFormatChange("Americano")}
          >
            Americano
          </button>
          <button
            type="button"
            className={newTournament.format === "Mexicano" ? "selected" : ""}
            onClick={() => handleFormatChange("Mexicano")}
          >
            Mexicano
          </button>
        </div>
        <div>
          <p>Scoring Format:</p>
          {["16", "21", "24", "32"].map((score) => (
            <button
              key={score}
              type="button"
              className={
                newTournament.scoringFormat === score ? "selected" : ""
              }
              onClick={() => handleScoringFormatChange(score)}
            >
              {score}
            </button>
          ))}
        </div>
        <div>
          <p>Players:</p>
          <input
            type="text"
            value={currentPlayer}
            onChange={(e) => setCurrentPlayer(e.target.value)}
            placeholder="Player Initials"
          />
          <button type="button" onClick={addPlayer}>
            Add Player
          </button>
          <ul>
            {newTournament.players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Create</button>
      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default CreateTournament;
