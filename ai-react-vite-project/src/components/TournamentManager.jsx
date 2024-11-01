import { createContext, useState } from "react";

export const TournamentContext = createContext();

function TournamentManager({ children }) {
  const [tournaments, setTournaments] = useState([]);

  const addTournament = (tournament) => {
    setTournaments([...tournaments, tournament]);
  };

  return (
    <TournamentContext.Provider value={{ tournaments, addTournament }}>
      {children}
    </TournamentContext.Provider>
  );
}

export default TournamentManager;
