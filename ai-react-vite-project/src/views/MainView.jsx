import { useContext } from "react";
import { Link } from "react-router-dom";
import { TournamentContext } from "../components/TournamentManager";
import "../styling/MainView.css";

function MainView() {
  const { tournaments } = useContext(TournamentContext);

  return (
    <div className="main-container">
      <h1 className="header">Padel Tournament Manager</h1>
      <Link to="/create-tournament">
        <button className="create-button">Create Tournament</button>
      </Link>
      <ul className="tournament-list">
        {tournaments.map((tournament, index) => (
          <li key={index} className="tournament-item">
            <p>
              <strong>Name:</strong> {tournament.name}
            </p>
            <p>
              <strong>Status:</strong> {tournament.status}
            </p>
            <p>
              <strong>Format:</strong> {tournament.format}
            </p>
            <p>
              <strong>Date Created:</strong> {tournament.dateCreated}
            </p>
            <p>
              <strong>Players:</strong>{" "}
              {tournament.players
                ? tournament.players.join(", ")
                : "No players"}
            </p>
            <Link to={`/tournament/${index}`}>
              <button className="view-button">View Tournament</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainView;
