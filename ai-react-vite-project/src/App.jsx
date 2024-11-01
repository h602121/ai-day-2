import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainView from "./views/MainView";
import CreateTournament from "./components/CreateTournament";
import TournamentDetail from "./views/TournamentDetail";
import TournamentManager from "./components/TournamentManager";

function App() {
  return (
    <Router>
      <TournamentManager>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/create-tournament" element={<CreateTournament />} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
        </Routes>
      </TournamentManager>
    </Router>
  );
}

export default App;
