import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TournamentContext } from "../components/TournamentManager";
import "../styling/TournamentDetail.css";

function TournamentDetail() {
  const { tournaments, addTournament } = useContext(TournamentContext);
  const { id } = useParams();
  const tournament = tournaments[id];
  const [matches, setMatches] = useState([]);
  const [playerStats, setPlayerStats] = useState({});
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [isTournamentFinished, setIsTournamentFinished] = useState(false);
  const [currentScore, setCurrentScore] = useState({ team1: 0, team2: 0 });

  useEffect(() => {
    if (tournament && matches.length === 0) {
      generateMatches();
    }
  }, [tournament]);

  const generateMatches = () => {
    const players = [...tournament.players];
    const newMatches = [];
    const stats = {};

    players.forEach((player) => {
      stats[player] = { points: 0, matchesPlayed: 0 };
    });

    const generateTeams = (players) => {
      const teams = [];
      for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
          teams.push([players[i], players[j]]);
        }
      }
      return teams;
    };

    const teams = generateTeams(players);
    const totalMatches = teams.length / 2;

    for (let i = 0; i < totalMatches; i++) {
      const team1 = teams[i];
      const team2 = teams[teams.length - 1 - i];
      newMatches.push({ team1, team2, score: { team1: 0, team2: 0 } });
    }

    setMatches(newMatches);
    setPlayerStats(stats);
  };

  const handleScoreChange = (team, score) => {
    setCurrentScore({ ...currentScore, [team]: score });
  };

  const handleConfirmScore = () => {
    const newMatches = [...matches];
    const { team1, team2 } = currentScore;
    const otherTeamScore = tournament.scoringFormat - team1;
    newMatches[currentMatchIndex].score.team1 = team1;
    newMatches[currentMatchIndex].score.team2 = otherTeamScore;
    setMatches(newMatches);

    const newStats = { ...playerStats };
    newMatches[currentMatchIndex].team1.forEach((player) => {
      newStats[player].points += team1;
      newStats[player].matchesPlayed += 1;
    });
    newMatches[currentMatchIndex].team2.forEach((player) => {
      newStats[player].points += otherTeamScore;
      newStats[player].matchesPlayed += 1;
    });
    setPlayerStats(newStats);

    if (currentMatchIndex < newMatches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
      setCurrentScore({ team1: 0, team2: 0 });
    } else {
      setIsTournamentFinished(true);
    }
  };

  const handleFinishTournament = () => {
    const updatedTournament = { ...tournament, matches, playerStats };
    const updatedTournaments = [...tournaments];
    updatedTournaments[id] = updatedTournament;
    addTournament(updatedTournaments);
  };

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  return (
    <div className="tournament-detail-container">
      <h2>{tournament.name}</h2>
      {!isTournamentFinished ? (
        matches[currentMatchIndex] ? (
          <div className="match">
            <div className="team">
              <p>Team 1: {matches[currentMatchIndex].team1.join(", ")}</p>
              <input
                type="number"
                value={currentScore.team1}
                onChange={(e) =>
                  handleScoreChange("team1", parseInt(e.target.value))
                }
              />
            </div>
            <div className="team">
              <p>Team 2: {matches[currentMatchIndex].team2.join(", ")}</p>
              <input
                type="number"
                value={tournament.scoringFormat - currentScore.team1}
                readOnly
              />
            </div>
            <button onClick={handleConfirmScore}>Confirm Score</button>
          </div>
        ) : (
          <div>Loading match...</div>
        )
      ) : (
        <button onClick={handleFinishTournament}>Finish Tournament</button>
      )}
    </div>
  );
}

export default TournamentDetail;
